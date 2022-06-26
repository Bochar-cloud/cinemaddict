import AbstractView from 'Framework/view/abstract-view';
import { RitingType } from 'Sourse/const';

const userRaitingText = {
  [RitingType.NOVICE]: 'Novice',
  [RitingType.FAN]: 'Fan',
  [RitingType.BUFF]: 'Movie Buff',
};

const createUserRaitingTemplate = (raitingType) => {
  const userRaitingTextValue = userRaitingText[raitingType];

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRaitingTextValue}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRaitingView extends AbstractView {
  #raitingType = null;

  constructor(raitingType) {
    super();
    this.#raitingType = raitingType;
  }

  get template() {
    return createUserRaitingTemplate(this.#raitingType);
  }
}

