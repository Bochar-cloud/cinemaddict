import { generateFilm } from 'Sourse/mock/film';
import { QUALITY_FILMS } from 'Sourse/const';
import Observable from 'Framework/observable';

export default class FilmModel extends Observable {
  #films = Array.from({length: QUALITY_FILMS}, generateFilm);

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
