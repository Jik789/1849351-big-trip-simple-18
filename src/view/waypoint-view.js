// @ts-nocheck

import { createElement } from '../render.js';
import { humanizeDate } from '../utils.js';
import { destinationMock } from '../mock/destination-mock.js';


const createWaypointTemplate = (waypoint) => {
  const {basePrice, type, dateFrom, dateTo, destination} = waypoint;

  const dateFromReadble = humanizeDate(dateFrom);
  const dateToReadble = humanizeDate(dateTo);

  const name = destinationMock().find((el) => (el.id === destination)).name;

  return (`
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dateFromReadble}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type[0].toUpperCase()}${type.slice(1)} ${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`);
};

export default class WaypointView {
  constructor(waypoint) {
    this.waypoint = waypoint;
  }

  getTemplate() {
    return createWaypointTemplate(this.waypoint);
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
