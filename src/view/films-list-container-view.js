import AbstractView from 'Framework/view/abstract-view';

const createFilmsListContainerTemplate = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmsListContainerView extends AbstractView {
  get template() {
    return createFilmsListContainerTemplate();
  }
}
