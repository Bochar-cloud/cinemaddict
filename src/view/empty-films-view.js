import AbstractView from 'Framework/view/abstract-view';
import { FilterType } from 'Sourse/const';

const emptyFilmsText = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'Your watch list is empty',
  [FilterType.HISTORY]: 'You haven\'t watched any movies yet',
  [FilterType.FAVORITES]: 'You didn\'t add movies to favorites',
};

const createEmptyFilmsTemplate = (filterType) => {
  const emptyFilmsTextValue = emptyFilmsText[filterType];

  return (
    `<h2 class="films-list__title">${emptyFilmsTextValue}</h2>`
  );
};


export default class EmptyFilmsView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyFilmsTemplate(this.#filterType);
  }
}
