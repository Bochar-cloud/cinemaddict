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
  #comments = null;
  #changeData = null;

  #changeStatus = null;

  #status = Status.HIDE;

  #commentsModel = null;

  #saveModalScroll = null;

  constructor(filmListContainer, changeData, changeStatus, saveModalScroll) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeStatus = changeStatus;
    this.#saveModalScroll = saveModalScroll;
  }

  init = (film, comments, isModalShow, scrollTop) => {
    this.#film = film;
    this.#comments = comments.comments;

    this.#commentsModel = comments;

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmView(this.#film);
    this.#modalComponent = new ModalView(this.#film, this.#comments);

    this.#filmComponent.setLinkClickHandler(this.#filmClickHandler);
    this.#filmComponent.setWatchListClickHandler(this.#watchListClickHandler);
    this.#filmComponent.setWatchedClickHandler(this.#watchedClickHandler);
    this.#filmComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#modalComponent.setCloseButtonClickHandler(this.#closeButtonClickHandler);
    this.#modalComponent.setDeleteCommentClickHandler(this.#deleteCommentClickHandler);
    this.#modalComponent.setFormSubmitHandler(this.#formSubmitHandler);

    if (isModalShow) {
      this.#showModal();
    }

    if (scrollTop) {
      this.#modalComponent.element.scroll({
        left: 0,
        top: scrollTop,
        behavior: 'smooth',
      });
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
    document.body.appendChild(this.#modalComponent.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escapeKeydownHandler);
    this.#changeStatus(this.#film.id);
    this.#status = Status.SHOW;
  };

  #hideModal = () => {
    if (document.body.contains(this.#modalComponent.element)) {
      document.body.removeChild(this.#modalComponent.element);
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this.#escapeKeydownHandler);
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
    const filmComments = this.#film.comments.filter((comment) => comment !== commentId);

    this.#commentsModel.deleteComment(UpdateType.MINOR, commentId);

    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, comments: filmComments}
    );
  };

  #formSubmitHandler = (film, newComment, scrollTop) => {
    this.#saveModalScroll(scrollTop);
    film.comments.unshift(newComment.commentId);

    this.#commentsModel.addComment(UpdateType.MINOR, newComment);

    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...film, comments: film.comments}
    );
  };

  #watchListClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: { watchlist: !this.#film.userDetails.watchlist }}
    );
  };

  #watchedClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: { alreadyWatched: !this.#film.userDetails.alreadyWatched }}
    );
  };

  #favoriteClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: { favorite: !this.#film.userDetails.favorite }}
    );
  };
}
