import AbstractStatefulView from 'Framework/view/abstract-stateful-view';

const createFilmStatisticsTemplate = (filmsLength) => (
  `<section class="footer__statistics">
    <p>${filmsLength} movies inside</p>
  </section>`
);

export default class FilmStatistics extends AbstractStatefulView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFilmStatisticsTemplate(this.#films.length);
  }
}
