import dayjs from 'dayjs';

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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {getRandomInteger, getRandomFloatInteger, normalizeFilmDate, normalizeRuntime, getRandomBoolean, updateItem};
