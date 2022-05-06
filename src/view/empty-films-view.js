import AbstractView from 'Framework/view/abstract-view';

const createEmptyFilmsTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class EmptyFilmsView extends AbstractView {
  get template() {
    return createEmptyFilmsTemplate();
  }
}
