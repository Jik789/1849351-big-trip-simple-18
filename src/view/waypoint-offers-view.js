import { createElement } from '../render.js';
// import { offerMock } from '../mock/offer-mock';

const createOffersWaypointTemplate = (offers) => {
  const {title, price} = offers;
  console.log(offers)
  return (`
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`);
};

export default class WaypointOffersView {
  constructor(waypoint) {
    this.waypoint = waypoint;
  }

  getTemplate() {
    return createOffersWaypointTemplate(this.waypoint);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
