import AbstractView from 'Framework/view/abstract-view';
import { SortType } from 'Sourse/const';
import classNames from 'classnames';

const createSortTemplate = (currentSortType) => {
  const defaultClasses = classNames({'sort__button--active' : currentSortType === SortType.DEFAULT});
  const dateClasses = classNames({'sort__button--active' : currentSortType === SortType.DATE});
  const ratingClasses = classNames({'sort__button--active' : currentSortType === SortType.RAITING});

  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button ${defaultClasses}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button ${dateClasses}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button ${ratingClasses}" data-sort-type="${SortType.RAITING}">Sort by rating</a></li>
    </ul>`
  )
};

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
