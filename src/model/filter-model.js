import Observable from 'Framework/observable';
import { FilterType } from 'Sourse/const';

export default class FilterModel extends Observable {
  #filter = FilterType.ALL;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateTyte, filter) => {
    this.#filter = filter;
    this._notify(updateTyte, filter);
  };
}
