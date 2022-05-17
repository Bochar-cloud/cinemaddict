import { FilmView, ModalView } from 'View';
import { render, remove, replace } from 'Framework/render';

const Status = {
  HIDE: 'HIDE',
  SHOW: 'SHOW',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #film = null;
  #filmComponent = null;
  #modalComponent = null;
  #comments = null;
  #changeData = null;

  #changeStatus = null;

  #status = Status.HIDE;

  constructor(filmListContainer, changeData, changeStatus) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeStatus = changeStatus;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmComponent = this.#filmComponent;
    const prevModalComponent = this.#modalComponent;

    this.#filmComponent = new FilmView(this.#film);
    this.#modalComponent = new ModalView(this.#film, this.#comments);

    this.#filmComponent.setLinkClickHandler(this.#filmClickHandler);
    this.#filmComponent.setWatchListClickHandler(this.#watchListClickHandler);
    this.#filmComponent.setWatchedClickHandler(this.#watchedClickHandler);
    this.#filmComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#modalComponent.setCloseButtonClickHandler(this.#closeButtonClickHandler);

    if (prevFilmComponent === null || prevModalComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#status === Status.HIDE) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#status === Status.SHOW) {
      replace(this.#modalComponent, prevModalComponent);
    }

    remove(prevFilmComponent);
    remove(prevModalComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#modalComponent);
  };

  resetView = () => {
    if (this.#status !== Status.HIDE) {
      this.#hideModal();
    }
  };

  #showModal = () => {
    document.body.appendChild(this.#modalComponent.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escapeKeydownHandler);
    this.#changeStatus();
    this.#status = Status.SHOW;
  };

  #hideModal = () => {
    document.body.removeChild(this.#modalComponent.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
    this.#status = Status.HIDE;
  };

  #escapeKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#hideModal();
    }
  };

  #filmClickHandler = () => {
    this.#showModal();
  };

  #closeButtonClickHandler = () => {
    this.#hideModal();
  };

  #watchListClickHandler = () => {
    this.#changeData({...this.#film, userDetails: { watchlist: !this.#film.userDetails.watchlist }});
  };

  #watchedClickHandler = () => {
    this.#changeData({...this.#film, userDetails: { alreadyWatched: !this.#film.userDetails.alreadyWatched }});
  };

  #favoriteClickHandler = () => {
    this.#changeData({...this.#film, userDetails: { favorite: !this.#film.userDetails.favorite }});
  };
}
