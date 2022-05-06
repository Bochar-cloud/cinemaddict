import { UserRaitingView, MenuView, SortView } from 'View';
import { SectionFilmsPresenter } from 'Presenter';
import { FilmModel } from 'Model';
import { render } from 'Framework/render';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmModel = new FilmModel();
const sectionFilmsPresenter = new SectionFilmsPresenter(siteMainElement, filmModel);

render(new UserRaitingView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SortView(), siteMainElement);

sectionFilmsPresenter.init();
