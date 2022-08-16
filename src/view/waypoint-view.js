// @ts-nocheck

import { createElement } from '../render.js';
import { humanizeDate, humanizeTime, robotDate, robotDateTime } from '../utils.js';
import { destinationMock } from '../mock/destination-mock.js';


const createWaypointTemplate = (waypoint) => {
  const {basePrice, type, dateFrom, dateTo, destination, offers} = waypoint;

  const dateFromReadble = humanizeDate(dateFrom);
  const dateToReadble = humanizeDate(dateTo);

  const timeFromReadble = humanizeTime(dateFrom);
  const timeToReadble = humanizeTime(dateTo);

  const robotDateFrom = robotDate(dateFrom);
  const robotDateTo = robotDate(dateTo);

  const robotDateTimeFrom = robotDateTime(dateFrom);
  const robotDateTimeTo = robotDateTime(dateTo);

  const name = destinationMock().find((el) => (el.id === destination)).name;

  return (`
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${robotDateFrom}">${dateFromReadble}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type[0].toUpperCase()}${type.slice(1)} ${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${robotDateTimeFrom}">${timeFromReadble}</time>
        &mdash;
        <time class="event__end-time" datetime="${robotDateTimeTo}">${timeToReadble}</time>
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
