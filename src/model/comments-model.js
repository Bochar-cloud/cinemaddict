import Observable from 'Framework/observable';
import { UpdateType } from 'Sourse/const';

export default class CommentsModel extends Observable {
  #apiService = null;
  #filmModel = null;
  #comments = [];

  constructor (apiService, filmModel) {
    super();
    this.#apiService = apiService;
    this.#filmModel = filmModel;
  }

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  loadComments = async (film) => {
    try {
      const comments = await this.#apiService.getComments(film.id);
      this.#comments = comments.map(this.#adaptToClient);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.MINOR, film);
  };

  resetComments = () => {
    this.#comments = [];
  };

  addComment = async (updateType, filmId, newFilmComment) => {
    try {
      const response = await this.#apiService.addComment(filmId, newFilmComment);

      const comments = response.comments;

      this.comments = comments.map((comment) => this.#adaptToClient(comment));
      this.#filmModel.addComment(filmId, comments[comments.length - 1].id);

      this._notify(updateType);
    } catch {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, filmid, commentId) => {
    try {
      await this.#apiService.deleteComment(commentId);
      const comments = this.#comments.filter((comment) => +comment.commentId !== commentId);
      this.#comments = comments;

      this.#filmModel.deleteComment(filmid, commentId);

      this._notify(updateType);
    } catch {
      throw new Error('Can\'t delete comment');
    }
  };

  #adaptToClient = (comment) => {
    const adaptedComment = {...comment,
      commentId: comment['id'],
      commentDate: comment['date']
    };

    delete adaptedComment['id'];
    delete adaptedComment['date'];

    return adaptedComment;
  };
}
