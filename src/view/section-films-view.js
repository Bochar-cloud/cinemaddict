import { createElement } from '../render.js';

const createSectionFilmsTemplate = () => (
  '<section class="films"></section>'
);

export default class SectionFilmsView {
  #element = null;

  get template() {
    return createSectionFilmsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
