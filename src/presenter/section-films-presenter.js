import { SectionFilmsView, FilmsListView, FilmsListContainerView, MoreButtonView, EmptyFilmsView } from 'View';
import { FilmPresenter } from 'Presenter';
import { render, remove } from 'Framework/render';
import { updateItem } from 'Sourse/utils';

const FILMS_COUNT_STEP = 5;

export default class SectionFilmsPresenter {
  #sectionFilmsComponent = new SectionFilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #moreButtonComponent = new MoreButtonView();
  #emptyFilmsComponent = new EmptyFilmsView();

  #container = null;
  #filmModel = null;

  #films = [];
  #comments = [];

  #renderFilmsCount = FILMS_COUNT_STEP;

  #filmPresenter = new Map();

  constructor(container, filmModel) {
    this.#container = container;
    this.#filmModel = filmModel;
  }

  init = () => {
    this.#films = [...this.#filmModel.films];
    this.#comments = [...this.#filmModel.comments];

    this.#renderFilmListContainer();
  };

  #renderFilmsList = () => {
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilms(0, Math.min(this.#films.length, FILMS_COUNT_STEP));

    if (this.#films.length > FILMS_COUNT_STEP) {
      this.#renderMoreButton();
    }
  };

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, this.#comments));
  };

  #renderFilm = (film, comments) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#filmChangeHandler, this.#changeStatusModalHandler);
    filmPresenter.init(film, comments);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderEmptyFilm = () => {
    render(this.#emptyFilmsComponent, this.#filmsListComponent.element);
  };

  #renderMoreButton = () => {
    render(this.#moreButtonComponent, this.#filmsListComponent.element);

    this.#moreButtonComponent.setMoreButtonClickHandler(this.#clickShowMoreButtonHandler);
  };

  #renderFilmListContainer = () => {
    render(this.#sectionFilmsComponent, this.#container);
    render(this.#filmsListComponent, this.#sectionFilmsComponent.element);

    if (this.#films.length === 0) {
      this.#renderEmptyFilm();
      return;
    }

    this.#renderFilmsList();
  };

  #clickShowMoreButtonHandler = () => {
    this.#renderFilms(this.#renderFilmsCount, this.#renderFilmsCount + FILMS_COUNT_STEP);

    this.#renderFilmsCount += FILMS_COUNT_STEP;

    if (this.#renderFilmsCount >= this.#films.length) {
      this.#moreButtonComponent.element.remove();
      this.#moreButtonComponent.removeElement();
    }
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderFilmsCount = FILMS_COUNT_STEP;
    remove(this.#moreButtonComponent);
  };

  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, this.#comments);
  };

  #changeStatusModalHandler = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };
}
