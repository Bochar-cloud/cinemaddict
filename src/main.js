import UserRaitingView from './view/user-raiting-view.js';
import MenuView from './view/menu-view.js';
import SortView from './view/sort-view.js';
import ModalView from './view/modal-view.js';
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
