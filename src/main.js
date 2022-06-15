import { UserRaitingView } from 'View';
import { SectionFilmsPresenter, FilterPresenter } from 'Presenter';
import { FilmModel, CommentsModel, FilterModel } from 'Model';
import { render } from 'Framework/render';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmModel = new FilmModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

const sectionFilmsPresenter = new SectionFilmsPresenter(siteMainElement, filmModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmModel);

render(new UserRaitingView(), siteHeaderElement);

filterPresenter.init();
sectionFilmsPresenter.init();
