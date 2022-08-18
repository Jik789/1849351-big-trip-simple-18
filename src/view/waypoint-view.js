// @ts-nocheck

import { createElement } from '../render.js';
import { humanizeDate, humanizeTime, robotDate, robotDateTime } from '../utils.js';


const createWaypointTemplate = (waypoint, offers, destination) => {
  const dateFrom = waypoint.dateFrom;
  const dateTo = waypoint.dateTo;

  const dateFromReadble = humanizeDate(dateFrom);
  const dateToReadble = humanizeDate(dateTo);

  const timeFromReadble = humanizeTime(dateFrom);
  const timeToReadble = humanizeTime(dateTo);

  const robotDateFrom = robotDate(dateFrom);
  const robotDateTo = robotDate(dateTo);

  const robotDateTimeFrom = robotDateTime(dateFrom);
  const robotDateTimeTo = robotDateTime(dateTo);

  const createOffersWaypointTemplate = (allOffers) =>
    (`${allOffers.map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('')}`
    );

  return (`
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">MAR 18</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${waypoint.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">Taxi Amsterdam</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">20</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${createOffersWaypointTemplate(offers)}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>
`);
};

export default class WaypointView {
  constructor(waypoint, offers, destination) {
    this.waypoint = waypoint;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate = () => createWaypointTemplate(this.waypoint, this.offers, this.destination);

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
