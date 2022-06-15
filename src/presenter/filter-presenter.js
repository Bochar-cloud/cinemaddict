import { render, replace, remove } from 'Framework/render';
import { FilterView } from 'View';
import { filter } from 'Sourse/utils';
import { FilterType, UpdateType } from 'Sourse/const';

export default class FilterPresenter {
  #filterContainer = null;
  #filterMoModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterMoModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterMoModel = filterMoModel;
    this.#filmsModel = filmsModel;

    this.#filterMoModel.addObserver(this.#handleModelEvent);
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        name: 'all',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'history',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterMoModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterMoModel.filter === filterType) {
      return;
    }

    this.#filterMoModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
