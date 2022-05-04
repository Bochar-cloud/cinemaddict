import { SectionFilmsView, FilmsListView, FilmsListContainerView, FilmView, MoreButtonView, ModalView } from '../view';
import { render } from '../render';

export default class SectionFilmsPresenter {
  sectionFilmsComponent = new SectionFilmsView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init (container, filmModel) {
    this.container = container;
    this.filmModal = filmModel;
    this.films = [...this.filmModal.getFilms()];
    this.comments = [...this.filmModal.getComments()];

    render(this.sectionFilmsComponent, this.container);
    render(this.filmsListComponent, this.sectionFilmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    render(new MoreButtonView(), this.filmsListComponent.getElement());

    for (let i = 0; i < this.films.length; i++) {
      render(new FilmView(this.films[i]), this.filmsListContainerComponent.getElement());
    }

    render(new ModalView(this.films[1], this.comments), document.body);
  }
}
