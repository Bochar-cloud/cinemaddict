import { generateComments } from 'Sourse/mock/film';
import { QUALITY_FILMS } from 'Sourse/const';
import Observable from 'Framework/observable';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: QUALITY_FILMS}, generateComments);

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
}
