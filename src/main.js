import { UserRaitingView, MenuView, SortView } from './view';
import SectionFilmsPresenter from './presenter/section-films-presenter.js';
import { FilmModel } from './model';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmModel = new FilmModel();
const sectionFilmsPresenter = new SectionFilmsPresenter(siteMainElement, filmModel);

render(new UserRaitingView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SortView(), siteMainElement);

sectionFilmsPresenter.init();
