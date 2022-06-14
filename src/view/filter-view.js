import AbstractView from 'Framework/view/abstract-view';
import classNames from 'classnames';

const filterName = {
  'all': 'All movies',
  'watchlist': 'Watchlist',
  'history': 'History',
  'favorites': 'Favorites',
};

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${classNames({'main-navigation__item--active' : type === currentFilterType})}" data-filter-type="${type}">
      ${filterName[name]} ${type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : ''}
    </a>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    const currentfilterType = evt.target.getAttribute('data-filter-type');

    this._callback.filterTypeChange(currentfilterType);
  };
}
