import dayjs from 'dayjs';

const DATE_FORMATS = {
  'relise-date': 'D MMM YYYY',
  'comment-date': 'YYYY/M/DD HH:mm',
  'preview-date': 'YYYY',
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloatInteger = (a = 0, b = 1, float = 1) => (Math.random() * (b - a) + a).toFixed(float);

const normalizeFilmDate = (date, placeDate = 'relise-date') => {
  switch(placeDate) {
    case 'relise-date' :
      return dayjs(date).format(DATE_FORMATS['relise-date']);
    case 'comment-date' :
      return dayjs(date).format(DATE_FORMATS['comment-date']);
    case 'preview-date' :
      return dayjs(date).format(DATE_FORMATS['preview-date']);
  }
};

export {getRandomInteger, getRandomFloatInteger, normalizeFilmDate};
