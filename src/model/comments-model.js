import Observable from 'Framework/observable';
import { UpdateType } from 'Sourse/const';

export default class CommentsModel extends Observable {
  #apiService = null;
  #comments = [];

  constructor (apiService) {
    super();
    this.#apiService = apiService;
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

  get comments() {
    return this.#comments;
  }

  addComment = async (updateType, filmId, newFilmComment) => {
    try {
      await this.#apiService.addComment(filmId ,newFilmComment);

      this.#comments.push(newFilmComment);

      this._notify(updateType, newFilmComment);

    } catch {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, commentId) => {
    try {
      await this.#apiService.deleteComment(commentId);
      this.#comments.filter((comment) => comment.commentId !== commentId);

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
