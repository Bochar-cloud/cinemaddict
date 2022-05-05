import { SectionFilmsView, FilmsListView, FilmsListContainerView, FilmView, MoreButtonView, ModalView } from '../view';
import { render } from '../render';

export default class SectionFilmsPresenter {
  #sectionFilmsComponent = new SectionFilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();

  #container = null;
  #filmModel = null;

  #films = [];
  #comments = [];

  init (container, filmModel) {
    this.#container = container;
    this.#filmModel = filmModel;
    this.#films = [...this.#filmModel.films];
    this.#comments = [...this.#filmModel.comments];

    render(this.#sectionFilmsComponent, this.#container);
    render(this.#filmsListComponent, this.#sectionFilmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    render(new MoreButtonView(), this.#filmsListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilm(this.#films[i]);
    }
  }

  #renderFilm = (film) => {
    const filmComponent = new FilmView(film);
    const modalComponent = new ModalView(film, this.#comments);

    const filmLink = filmComponent.element.querySelector('.film-card__link');
    const modalCloseButton = modalComponent.element.querySelector('.film-details__close-btn');

    const showModal = () => {
      document.body.appendChild(modalComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const closeModal = () => {
      document.body.removeChild(modalComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const escapeKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    };

    filmLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      showModal();
      document.addEventListener('keydown', escapeKeydownHandler);
    });

    modalCloseButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeModal();
      document.removeEventListener('keydown', escapeKeydownHandler);
    });

    render(filmComponent, this.#filmsListContainerComponent.element);
  };
}
