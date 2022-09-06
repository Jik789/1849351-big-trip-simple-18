// @ts-nocheck

import { humanizeDateTime } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { DEFAULT_WAY_POINT, WAYPOINT_TYPE_MOCK } from '../mock/const-mock.js';
import { toUpperCaseFirstLetter, getObjectIndexInArray } from '../utils/utils';

const createFormEditTemplate = (waypoint, allDestination, allOffersByType) => {
  const dateFrom = waypoint.dateFrom;
  const dateTo = waypoint.dateTo;
  const destination = waypoint.destination;

  const dateTimeFromReadble = humanizeDateTime(dateFrom);
  const dateTimeToReadble = humanizeDateTime(dateTo);

  const createEventTypeListTemplate = () => (WAYPOINT_TYPE_MOCK.map((wayPointType) => {
    const checked = waypoint.type === wayPointType ? 'checked' : '';
    return `<div class="event__type-item">
      <input id="event-type-${wayPointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${wayPointType}" ${checked}>
      <label class="event__type-label  event__type-label--${wayPointType}" for="event-type-${wayPointType}-1">${toUpperCaseFirstLetter(wayPointType)}</label>
    </div>`;
  }
  ).join(''));

  const createOffersByTypeTemplate = () => (allOffersByType.map((offer, offerIndex) => {
    const waypointOffers = getObjectIndexInArray(waypoint.offers);
    const checked = waypointOffers.includes(offer.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerIndex}" type="checkbox" name="event-offer-luggage" ${checked}>
      <label class="event__offer-label" for="event-offer-${offerIndex}">
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }
  ).join(''));

  const createDestinationOptionsTemplate = () => (allDestination.map((destinationItem) => (
    `<option value="${destinationItem.name}"></option>`
  )).join(''));

  const createPhotosTemplate = (pictures) => (pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="Event photo">`
  )).join(''));

  const createPhotosContainerTemplate = () => {
    if ('pictures' in waypoint) {
      return `<div class="event__photos-container">
      <div class="event__photos-tape">
       ${createPhotosTemplate(waypoint.pictures)}
      </div>
    </div>`;
    } else {
      return '';
    }
  };

  const createDestinationsContainerTemplate = () => {
    if (destination !== null) {
      return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${waypoint.destination.description}</p>
      ${createPhotosContainerTemplate()}
    </section>`;
    } else {
      return '';
    }
  };

  return (`
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${waypoint.type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${createEventTypeListTemplate()}
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${waypoint.type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${waypoint.destination.name}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${createDestinationOptionsTemplate()}
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateTimeFromReadble}">
    —
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTimeToReadble}">
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      €
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${waypoint.basePrice}">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${createOffersByTypeTemplate()}
    </div>
  </section>
  ${createDestinationsContainerTemplate()}
</section>
</form>
</li>
`);
};

export default class FormEditView extends AbstractStatefulView {
  #allOffersByType = null;
  #allDestination = null;

  constructor(waypoint = DEFAULT_WAY_POINT, offers, destination, allOffersByType, allDestination) {
    super();
    this.#allOffersByType = allOffersByType;
    this.#allDestination = allDestination;
    this._state = FormEditView.parseWaypointToState(waypoint, destination, offers);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#allDestination, this.#allOffersByType);
  }

  static parseWaypointToState = (waypoint, destination, offers) => {
    const state = {
      ...waypoint,
      destination,
      offers
    };
    return state;
  };

  static parseStateToWaypoint = (state) => {
    const waypoint = {
      ...state,
      destination: state.destination.id,
      offers: getObjectIndexInArray(state.offers)
    };
    return waypoint;
  };

  #setInnerHandlers = () => {
    Array.from(this.element.querySelectorAll('.event__type-input')).forEach((typeElement) => typeElement
      .addEventListener('click', this.#eventTypeToggleHandler)
    );
  };

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitHandler(this._callback.submit);
    this.setClickHandler(this._callback.click);
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (event) => {
    event.preventDefault();
    this._callback.click();
  };

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitHandler);
  };

  #submitHandler = (event) => {
    event.preventDefault();
    this._callback.submit(FormEditView.parseStateToWaypoint(this._state));
  };
}
