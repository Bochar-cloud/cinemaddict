import { SectionFilmsView, FilmsListView, FilmsListContainerView, FilmView, MoreButtonView, ModalView, EmptyFilmsView} from 'View';
import { render } from 'Framework/render';

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

  constructor(container, filmModel) {
    this.#container = container;
    this.#filmModel = filmModel;
  }

  init = () => {
    this.#films = [...this.#filmModel.films];
    this.#comments = [...this.#filmModel.comments];

    this.#renderFilmListContainer();
  };

  #clickShowMoreButtonHandler = () => {
    this.#films
      .slice(this.#renderFilmsCount, this.#renderFilmsCount + FILMS_COUNT_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderFilmsCount += FILMS_COUNT_STEP;

    if (this.#renderFilmsCount >= this.#films.length) {
      this.#moreButtonComponent.element.remove();
      this.#moreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmView(film);
    const modalComponent = new ModalView(film, this.#comments);

    const showModal = () => {
      document.body.appendChild(modalComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const hideModal = () => {
      document.body.removeChild(modalComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const escapeKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        hideModal();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    };

    filmComponent.setLinkClickHandler(() => {
      showModal();
      document.addEventListener('keydown', escapeKeydownHandler);
    });

    modalComponent.setCloseButtonClickHandler(() => {
      hideModal();
      document.removeEventListener('keydown', escapeKeydownHandler);
    });

    render(filmComponent, this.#filmsListContainerComponent.element);
  };

  #renderFilmListContainer = () => {
    render(this.#sectionFilmsComponent, this.#container);
    render(this.#filmsListComponent, this.#sectionFilmsComponent.element);

    if (this.#films.length === 0) {
      render(this.#emptyFilmsComponent, this.#filmsListComponent.element);
      return;
    }

    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_STEP); i++) {
      this.#renderFilm(this.#films[i]);
    }

    if (this.#films.length > FILMS_COUNT_STEP) {
      render(this.#moreButtonComponent, this.#filmsListComponent.element);

      this.#moreButtonComponent.setMoreButtonClickHandler(this.#clickShowMoreButtonHandler);
    }
  };
}
