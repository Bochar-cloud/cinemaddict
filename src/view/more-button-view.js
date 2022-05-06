import AbstractView from 'Framework/view/abstract-view';

const createMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class MoreButtonView extends AbstractView{
  get template() {
    return createMoreButtonTemplate();
  }

  setMoreButtonClickHandler = (callback) => {
    this._callback.click = callback;

    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  };
}
