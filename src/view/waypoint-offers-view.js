import { createElement } from '../render.js';

const createOffersWaypointTemplate = (offers) => {
  const {title, price} = offers;
  return (`
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`);
};

export default class WaypointOffersView {
  constructor(waypointOffers) {
    this.waypointOffers = waypointOffers;
  }

  getTemplate() {
    return createOffersWaypointTemplate(this.waypointOffers);
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
