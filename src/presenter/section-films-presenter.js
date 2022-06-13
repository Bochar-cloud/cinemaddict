import { SectionFilmsView, FilmsListView, FilmsListContainerView, MoreButtonView, EmptyFilmsView, SortView } from 'View';
import { FilmPresenter } from 'Presenter';
import { render, remove, RenderPosition } from 'Framework/render';
import { compareFilmsDate, compareFilmsRaiting, filter } from 'Sourse/utils';
import { SortType, UpdateType, UserAction, FilterType } from 'Sourse/const';

const FILMS_COUNT_STEP = 5;

export default class SectionFilmsPresenter {
  #sectionFilmsComponent = new SectionFilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();

  #emptyFilmsComponent = null;
  #sortComponent = null;
  #moreButtonComponent = null;

  #activeModal = null;

  #scrollTop = null;

  #container = null;
  #filmModel = null;
  #commentsModel = null;
  #filterModel = null;

  #renderFilmsCount = FILMS_COUNT_STEP;

  #filmPresenter = new Map();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  #sortMap = {
    [SortType.DEFAULT]: (filteredFilms) => filteredFilms,
    [SortType.DATE]: (filteredFilms) => filteredFilms.sort(compareFilmsDate),
    [SortType.RAITING]: (filteredFilms) => filteredFilms.sort(compareFilmsRaiting),
  };

  constructor(container, filmModel, commentsModel, filterModel) {
    this.#container = container;
    this.#filmModel = filmModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderFilmListContainer();
  };

  get films() {
    this.#filterType = this.#filterModel.filter;

    const films = [...this.#filmModel.films];
    const filteredFilms = filter[this.#filterType](films);

    return this.#sortMap[this.#currentSortType](filteredFilms);
  }

  #saveModalScroll = (scrollTop) => {
    this.#scrollTop = scrollTop;
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data, this.#commentsModel);
        break;
      case UpdateType.MINOR:
        this.#clearFilmListContainer();
        this.#renderFilmListContainer();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmListContainer({resetRenderFilmsCount: true, resetSortType: true});
        this.#renderFilmListContainer();
        break;
    }
  };

  #renderFilms = (films) => {
    films.forEach((film) => {
      this.#renderFilm(film, this.#commentsModel);
    });
  };

  #renderFilm = (film, comments) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#handleViewAction, this.#changeStatusModalHandler, this.#saveModalScroll, this.#inActiveModal);
    filmPresenter.init(film, comments, this.#activeModal === film.id, this.#scrollTop);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderEmptyFilm = () => {
    this.#emptyFilmsComponent = new EmptyFilmsView(this.#filterType);
    render(this.#emptyFilmsComponent, this.#filmsListComponent.element);
  };

  #renderMoreButton = () => {
    this.#moreButtonComponent = new MoreButtonView();
    render(this.#moreButtonComponent, this.#filmsListComponent.element);

    this.#moreButtonComponent.setMoreButtonClickHandler(this.#clickShowMoreButtonHandler);
  };

  #clearFilmListContainer = ({resetRenderFilmsCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyFilmsComponent);
    remove(this.#moreButtonComponent);

    if (resetRenderFilmsCount) {
      this.#renderFilmsCount = FILMS_COUNT_STEP;
    } else {
      this.#renderFilmsCount = Math.min(filmCount, this.#renderFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderFilmListContainer = () => {
    const films = this.films;
    const filmCount = films.length;

    render(this.#sectionFilmsComponent, this.#container);
    render(this.#filmsListComponent, this.#sectionFilmsComponent.element);

    if (this.films.length === 0) {
      this.#renderEmptyFilm();
      return;
    }

    this.#renderSort();
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderFilmsCount)));

    if (filmCount > this.#renderFilmsCount) {
      this.#renderMoreButton();
    }
  };

  #clickShowMoreButtonHandler = () => {
    const filmsCount = this.films.length;
    const newRenderFilmsCount = Math.min(filmsCount, this.#renderFilmsCount + FILMS_COUNT_STEP);
    const films = this.films.slice(this.#renderFilmsCount, newRenderFilmsCount);

    this.#renderFilms(films);
    this.#renderFilmsCount = newRenderFilmsCount;

    if (this.#renderFilmsCount >= filmsCount) {
      remove(this.#moreButtonComponent);
    }
  };

  #changeStatusModalHandler = (id, scrollTop) => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
    this.#activeModal = id;
    this.#scrollTop = scrollTop;
  };

  #inActiveModal = () => {
    this.#activeModal = null;
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#sectionFilmsComponent.element, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearFilmListContainer({resetRenderFilmsCount: true});
    this.#renderFilmListContainer();
  };
}
