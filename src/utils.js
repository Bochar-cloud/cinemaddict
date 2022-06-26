import dayjs from 'dayjs';
import { FilterType, RitingType } from 'Sourse/const';


const DATE_FORMATS = {
  'relise-date': 'D MMM YYYY',
  'comment-date': 'YYYY/MM/DD HH:mm',
  'preview-date': 'YYYY',
};

const MINUTES_PER_HOUR = 60;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloatInteger = (a = 0, b = 1, float = 1) => (Math.random() * (b - a) + a).toFixed(float);

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const normalizeFilmDate = (date, placeDate = 'relise-date') => dayjs(date).format(DATE_FORMATS[placeDate]);

const normalizeRuntime = (time) => {
  const hourse = (time / MINUTES_PER_HOUR).toFixed(0);
  const minutes = time % MINUTES_PER_HOUR;

  if (time < MINUTES_PER_HOUR) {
    return `${minutes}m`;
  }

  return `${hourse}h ${minutes}m`;
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const compareFilmsDate = (filmA, filmB) => {
  const filmDateA = filmA.filmInfo.release.date;
  const filmDateB = filmB.filmInfo.release.date;

  const weight = getWeightForNullDate(filmDateA, filmDateB);

  return weight ?? dayjs(filmDateB).diff(dayjs(filmDateA));
};

const compareFilmsRaiting = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter(({userDetails: { watchlist }}) => watchlist),
  [FilterType.HISTORY]: (films) => films.filter(({userDetails: { alreadyWatched }}) => alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter(({userDetails: { favorite }}) => favorite),
};

const getUserRaiting = (watchedFilms) => {
  if (watchedFilms >= 1 && watchedFilms < 11) {
    return RitingType.NOVICE;
  } else if (watchedFilms >= 11 && watchedFilms < 21) {
    return RitingType.FAN;
  } else if (watchedFilms >= 21) {
    return RitingType.BUFF;
  }
};

export { getRandomInteger, getRandomFloatInteger, normalizeFilmDate, normalizeRuntime, getRandomBoolean, compareFilmsDate, compareFilmsRaiting, filter, getUserRaiting };
