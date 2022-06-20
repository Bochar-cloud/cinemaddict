import { UserRaitingView } from 'View';
import { SectionFilmsPresenter, FilterPresenter } from 'Presenter';
import { FilmModel, CommentsModel, FilterModel } from 'Model';
import FilmsApiServices from 'Sourse/services/api-service';
import { render } from 'Framework/render';

const AUTHORIZATION = 'Basic dsZXXZsd4dsakd';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');


const apiService = new FilmsApiServices(END_POINT, AUTHORIZATION);

const filmModel = new FilmModel(apiService);
const commentsModel = new CommentsModel(apiService);
const filterModel = new FilterModel();

const sectionFilmsPresenter = new SectionFilmsPresenter(siteMainElement, filmModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmModel);

render(new UserRaitingView(), siteHeaderElement);

filterPresenter.init();
sectionFilmsPresenter.init();
filmModel.init();
