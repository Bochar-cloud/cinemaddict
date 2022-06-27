// import { UserRaitingView, FilmStatistics } from 'View';
import { SectionFilmsPresenter, FilterPresenter } from 'Presenter';
import { FilmModel, CommentsModel, FilterModel } from 'Model';
import FilmsApiServices from 'Sourse/services/api-service';
// import { render } from 'Framework/render';

const AUTHORIZATION = 'Basic dsZXXZdsadaasdd';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const apiService = new FilmsApiServices(END_POINT, AUTHORIZATION);

const filmModel = new FilmModel(apiService);
const commentsModel = new CommentsModel(apiService, filmModel);
const filterModel = new FilterModel();

const sectionFilmsPresenter = new SectionFilmsPresenter(siteMainElement, siteHeaderElement, siteFooterElement, filmModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmModel);

filterPresenter.init();
sectionFilmsPresenter.init();
filmModel.init();


