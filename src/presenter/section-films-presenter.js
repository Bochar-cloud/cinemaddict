import SectionFilmsView from '../view/section-films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view.js';
import CardView from '../view/card-view';
import MoreButtonView from '../view/more-button-view';
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
