import { FilmView, ModalView } from 'View';
import { render, remove, replace } from 'Framework/render';
import { UserAction, UpdateType } from 'Sourse/const';

const Status = {
  HIDE: 'HIDE',
  SHOW: 'SHOW',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #film = null;
  #filmComponent = null;
  #modalComponent = null;
  #commentsModel = null;
  #changeData = null;

  #changeStatus = null;

  #status = Status.HIDE;

  #saveModalScroll = null;
  #inActiveModal = null;

  constructor(filmListContainer, changeData, changeStatus, saveModalScroll, inActiveModal) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeStatus = changeStatus;
    this.#saveModalScroll = saveModalScroll;
    this.#inActiveModal = inActiveModal;
  }

  init = (film, commentsModel, isModalShow, scrollTop) => {
    this.#film = film;
    this.#commentsModel = commentsModel;
    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmView(this.#film);
    this.#modalComponent = new ModalView(this.#film, this.#commentsModel.comments);

    this.#filmComponent.setLinkClickHandler(this.#filmClickHandler);
    this.#filmComponent.setWatchListClickHandler(this.#watchListClickHandler);
    this.#filmComponent.setWatchedClickHandler(this.#watchedClickHandler);
    this.#filmComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#modalComponent.setCloseButtonClickHandler(this.#closeButtonClickHandler);
    this.#modalComponent.setDeleteCommentClickHandler(this.#deleteCommentClickHandler);
    this.#modalComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#modalComponent.setModalWatchListClickHandler(this.#modalWatchListClickHandler);
    this.#modalComponent.setModalWatchedClickHandler(this.#modalWatchedClickHandler);
    this.#modalComponent.setModalFavoriteClickHandler(this.#modalFavoriteClickHandler);

    if (isModalShow) {
      this.#showModal();
    }

    if (scrollTop) {
      this.#modalComponent.element.scroll(0, scrollTop);
    }

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#status === Status.HIDE) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#status === Status.SHOW) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#modalComponent);
  };

  resetView = () => {
    if (this.#status !== Status.HIDE) {
      this.#modalComponent.reset(this.#film);
      this.#hideModal();
    }
  };

  #showModal = () => {
    if (!this.#commentsModel.comments.length) {
      this.#commentsModel.loadComments(this.#film);
      this.#changeStatus(this.#film.id);
      return;
    }

    document.body.appendChild(this.#modalComponent.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escapeKeydownHandler);
    this.#changeStatus(this.#film.id);
    this.#status = Status.SHOW;
  };

  #hideModal = () => {
    if (document.body.contains(this.#modalComponent.element)) {
      this.#commentsModel.resetComments();
      document.body.removeChild(this.#modalComponent.element);
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this.#escapeKeydownHandler);
      this.#inActiveModal();
      this.#status = Status.HIDE;
    }
  };

  #escapeKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#modalComponent.reset(this.#film);
      this.#hideModal();
    }
  };

  #filmClickHandler = () => {
    this.#showModal();
  };

  #closeButtonClickHandler = () => {
    this.#modalComponent.reset(this.#film);
    this.#hideModal();
  };

  #deleteCommentClickHandler = (commentId, scrollTop) => {
    this.#saveModalScroll(scrollTop);

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      commentId
    );
  };

  #formSubmitHandler = (film, newComment, scrollTop) => {
    this.#saveModalScroll(scrollTop);

    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      film,
      newComment
    );
  };

  #watchListClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist }}
    );
  };

  #watchedClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched }}
    );
  };

  #favoriteClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite }}
    );
  };

  #modalWatchListClickHandler = (scrollTop) => {
    this.#saveModalScroll(scrollTop);

    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist }}
    );
  };

  #modalWatchedClickHandler = (scrollTop) => {
    this.#saveModalScroll(scrollTop);

    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched }}
    );
  };

  #modalFavoriteClickHandler = (scrollTop) => {
    this.#saveModalScroll(scrollTop);

    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite }}
    );
  };
}
