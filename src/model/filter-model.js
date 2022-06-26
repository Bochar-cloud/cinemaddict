import Observable from 'Framework/observable';
import { FilterType } from 'Sourse/const';

export default class FilterModel extends Observable {
  #filterModel = FilterType.ALL;

  get filter() {
    return this.#filterModel;
  }

  setFilter = (updateTyte, filter) => {
    this.#filterModel = filter;
    this._notify(updateTyte, filter);
  };
}
