import he from 'he';
import AbstractStatefulView from 'Framework/view/abstract-stateful-view';
import { normalizeFilmDate, normalizeRuntime } from 'Sourse/utils.js';
import classNames from 'classnames';

const createModalTemplate = (film, filmComments) => {

  const {
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      poster,
      runtime,
      genre,
      description,
      release,
      director,
      writers,
      actors,
      ageRating
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
    commentEmotion,
    commentText,
    isDisabled,
    isDeleting,
    currentId
  } = film;

  const watchlistClasses = classNames({ 'film-details__control-button--active': watchlist });
  const alreadyWatchedClasses = classNames({ 'film-details__control-button--active': alreadyWatched });
  const favoriteClasses = classNames({ 'film-details__control-button--active': favorite });

  const createComments = ({ commentId, author, comment, commentDate, emotion }) => (
    `<li class="film-details__comment" data-comment-id="${commentId}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${normalizeFilmDate(commentDate, 'comment-date')}</span>
          <button class="film-details__comment-delete" data-comment-id="${commentId}" ${isDisabled ? 'disabled' : ''}>
            ${isDeleting && currentId === commentId ? 'Deleting...' : 'Delete'}
          </button>
        </p>
      </div>
    </li>`
  );

  const createCommentEmotion = (emotion) => (
    `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">`
  );

  const createGenre = (genreItem) => (
    `<span class="film-details__genre">${genreItem}</span>`
  );

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get" ${isDisabled ? 'disabled' : ''}>
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">${director}</td>
                  <td class="film-details__cell">Anthony Mann</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${normalizeFilmDate(release.date, 'relise-date')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${normalizeRuntime(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">USA</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genre.map(createGenre).join('')}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClasses}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClasses}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClasses}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmComments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${filmComments.map(createComments).join('')}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
                ${commentEmotion ? createCommentEmotion(commentEmotion) : ''}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" >${commentText ? commentText : ''}</textarea>
              </label>

              <input type="hidden" id="comment-emoji" name="comment-emoji">

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`);
};

export default class ModalView extends AbstractStatefulView {
  #filmComments = null;
  #commentEmotion = null;
  #scrollTop = null;

  constructor(film, filmComments) {
    super();
    this._state = this.parseFilmToState(film);
    this.#filmComments = filmComments;
    this.#setInnerHandlers();
  }

  get template() {
    return createModalTemplate(this._state, this.#filmComments);
  }

  parseFilmToState = (film) => ({
    ...film,
    commentEmotion: film.commentEmotion,
    commentText: film.commentText,
    isDesabled: false,
    isDeleting: false,
  });

  parseStateToFilm = (state) => {
    const film = { ...state };

    delete film.commentText;
    delete film.commentEmotion;
    delete film.isDesabled;
    delete film.isDeleting;

    return film;
  };

  reset = (film) => {
    this.updateElement(
      this.parseFilmToState(film),
    );
  };

  setCloseButtonClickHandler = (callback) => {
    const closeButton = this.element.querySelector('.film-details__close-btn');
    this._callback.click = callback;

    closeButton.addEventListener('click', this.#hideModal);
  };

  setDeleteCommentClickHandler = (callback) => {
    const deleteButtons = this.element.querySelectorAll('.film-details__comment-delete');
    this._callback.deleteClick = callback;

    deleteButtons.forEach((button) => button.addEventListener('click', this.#deleteCommentClickHandler));
  };

  setFormSubmitHandler = (callback) => {
    const commentInput = this.element.querySelector('.film-details__comment-input');
    this._callback.commentFormSubmit = callback;

    commentInput.addEventListener('keydown', this.#formSubmitHandler);
  };

  setModalWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  setModalWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setModalFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.click);
    this.setDeleteCommentClickHandler(this._callback.deleteClick);
    this.setFormSubmitHandler(this._callback.commentFormSubmit);
    this.setModalWatchListClickHandler(this._callback.watchListClick);
    this.setModalWatchedClickHandler(this._callback.watchedClick);
    this.setModalFavoriteClickHandler(this._callback.favoriteClick);

    this.element.scroll(0, this.#scrollTop);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#emotionsChangeHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
  };

  #createNewCommentTemplate = (evt) => ({
    comment: evt.target.value,
    emotion: this.#commentEmotion,
  });

  #hideModal = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #formSubmitHandler = (evt) => {
    if (evt.key === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
      evt.preventDefault();
      this.#scrollTop = this.element.scrollTop;

      const currentFilm = this.parseStateToFilm(this._state);

      this._callback.commentFormSubmit(currentFilm, this.#createNewCommentTemplate(evt), this.#scrollTop);
    }
  };

  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();

    this.#scrollTop = this.element.scrollTop;

    const commentId = +evt.target.getAttribute('data-comment-id');

    this._callback.deleteClick(commentId, this.#scrollTop);
  };

  #emotionsChangeHandler = (evt) => {
    evt.preventDefault();

    const scrollPosition = this.element.scrollTop;

    this.#commentEmotion = evt.target.value;

    const currentEmotion = this.#commentEmotion;

    this.updateElement({
      commentEmotion: currentEmotion,
    });

    this.element.querySelector('#comment-emoji').value = currentEmotion;
    this.element.scroll(0, scrollPosition);
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      commentText: evt.target.value
    });
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    const scrollPosition = this.element.scrollTop;

    this._callback.watchListClick(scrollPosition);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    const scrollPosition = this.element.scrollTop;

    this._callback.watchedClick(scrollPosition);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    const scrollPosition = this.element.scrollTop;

    this._callback.favoriteClick(scrollPosition);
  };
}
