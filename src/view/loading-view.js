import AbstractStatefulView from 'Framework/view/abstract-stateful-view';

const createLoadingTemplate = () => (
  '<h2 class="films-list__title">Loading...</h2>'
);

export default class LoadingView extends AbstractStatefulView {
  get template() {
    return createLoadingTemplate();
  }
}


