import { generateFilm, generateComments } from 'Sourse/mock/film';

const QUALITY_FILMS = 23;

export default class FilmModel {
  #films = Array.from({length: QUALITY_FILMS}, generateFilm);
  #comments = Array.from({length: QUALITY_FILMS}, generateComments);

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
