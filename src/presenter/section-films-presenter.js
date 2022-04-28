import { SectionFilmsView, FilmsListView, FilmsListContainerView, CardView, MoreButtonView } from '../view';
import { render } from '../render';

const QUALITY_CARD = 5;

export default class SectionFilmsPresenter {
  sectionFilmsComponent = new SectionFilmsView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init (container) {
    this.container = container;

    render(this.sectionFilmsComponent, this.container);
    render(this.filmsListComponent, this.sectionFilmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    render(new MoreButtonView(), this.filmsListComponent.getElement());

    for (let i = 0; i < QUALITY_CARD; i++) {
      render(new CardView(), this.filmsListContainerComponent.getElement());
    }
  }
}
