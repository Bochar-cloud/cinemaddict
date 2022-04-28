import { UserRaitingView, MenuView, SortView, ModalView } from './view';
import SectionFilmsPresenter from './presenter/section-films-presenter.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const sectionFilmsPresenter = new SectionFilmsPresenter();

render(new UserRaitingView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new ModalView(), document.body);

sectionFilmsPresenter.init(siteMainElement);
