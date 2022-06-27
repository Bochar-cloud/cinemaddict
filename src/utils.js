import dayjs from 'dayjs';
import { FilterType, RitingType } from 'Sourse/const';


const DATE_FORMATS = {
  'relise-date': 'D MMM YYYY',
  'comment-date': 'YYYY/MM/DD HH:mm',
  'preview-date': 'YYYY',
};

const MINUTES_PER_HOUR = 60;
const MIN_LENGTH_NOVICE = 1;
const MAX_LENGTH_NOVICE = 10;
const MIN_LENGTH_FAN = 11;
const MAX_LENGTH_FAN = 20;
const MIN_LENGTH_BUFF = 21;

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

const getUserRaiting = (watchedFilmsLength) => {
  if (watchedFilmsLength >= MIN_LENGTH_NOVICE && watchedFilmsLength <= MAX_LENGTH_NOVICE) {
    return RitingType.NOVICE;
  }

  if (watchedFilmsLength >= MIN_LENGTH_FAN && watchedFilmsLength <= MAX_LENGTH_FAN) {
    return RitingType.FAN;
  }

  if (watchedFilmsLength >= MIN_LENGTH_BUFF) {
    return RitingType.BUFF;
  }
};

export { normalizeFilmDate, normalizeRuntime, compareFilmsDate, compareFilmsRaiting, filter, getUserRaiting };
