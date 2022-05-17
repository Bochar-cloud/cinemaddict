import AbstractView from 'Framework/view/abstract-view';
import { normalizeFilmDate, normalizeRuntime } from 'Sourse/utils';

const createCardTemplate = (film) => {
  const {
    filmInfo: {
      title,
      totalRating,
      poster,
      runtime,
      genre,
      description,
      release
    },
    comments
  } = film;

  const date = release.date !== null ? normalizeFilmDate(release.date, 'preview-date') : '';

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${date}</span>
          <span class="film-card__duration">${normalizeRuntime(runtime)}</span>
          <span class="film-card__genre">${genre.join(', ')}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`);
};

export default class FilmView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  setLinkClickHandler = (callback) => {
    const link = this.element.querySelector('.film-card__link');
    this._callback.click = callback;

    link.addEventListener('click', this.#showModal);
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.watchListClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.watchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.favoriteClick();
  };

  #showModal = (evt) => {
    evt.preventDefault();

    this._callback.click();
  };

  get template() {
    return createCardTemplate(this.#film);
  }
}
