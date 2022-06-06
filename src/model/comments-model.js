import { generateComments } from 'Sourse/mock/film';
import { QUALITY_FILMS } from 'Sourse/const';
import Observable from 'Framework/observable';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: QUALITY_FILMS}, generateComments);

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const idx = this.#comments.findIndex((comment) => comment.commentId === update.commentId);

    if (idx === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, idx),
      ...this.#comments.slice(idx + 1),
    ];

    this._notify(updateType);
  };
}
