import Observable from 'Framework/observable';
import { UpdateType } from 'Sourse/const';

export default class FilmModel extends Observable {
  #apiService = null;
  #films = [];

  constructor (apiService) {
    super();
    this.#apiService = apiService;
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#apiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  };

  addComment = (filmId, commentId) => {
    this.#films.find((film) => {
      if (film.id === filmId) {
        film.comments.push(commentId);
      }
    });
  };

  deleteComment = (filmId, commentId) => {
    const film = this.#films.find((findFilm) => findFilm.id === filmId);

    if (film) {
      const idx = film.comments.findIndex((comment) => +comment === commentId);
      film.comments.splice(idx, 1);
    }
  };

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {
      const response = await this.#apiService.updateFilm(update);
      const updetedfilm = this.#adaptToClient(response);

      this.#films.splice(index, 1, updetedfilm);
      this._notify(updateType, updetedfilm);
    } catch(err) {
      throw new Error('Can\'t update movie');
    }
  };

  #adaptToClient = (film) => {
    const adaptedFilm = {...film,
      filmInfo: {...film['film_info'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        ageRating: film['film_info']['age_rating'],
        release: {...film['film_info']['release'],
          releaseCountry: film['film_info']['release']['release_country'],
        },
      },
      userDetails: {...film['user_details'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date'],
      },
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo.release['release_country'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  };
}
