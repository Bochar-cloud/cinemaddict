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

    this._notify(UpdateType.PATCH, film);
  };

  resetComments = () => {
    this.#comments = [];
  };

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    this.#comments.unshift(update);

    this._notify(updateType, update);
  };

  deleteComment = (updateType, commentId) => {
    this.#comments.filter((comments) => comments.commentId !== commentId);

    this._notify(updateType, commentId);
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
