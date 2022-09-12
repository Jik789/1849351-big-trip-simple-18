// @ts-nocheck

import { humanizeDateTime } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { DEFAULT_WAY_POINT, WAYPOINT_TYPE_MOCK } from '../mock/const-mock.js';
import { toUpperCaseFirstLetter, getDestination, getOffersByType } from '../utils/utils';

const createFormEditTemplate = (waypoint, allOffers, allDestinations) => {
  const dateFrom = waypoint.dateFrom;
  const dateTo = waypoint.dateTo;

  const foundDestination = getDestination(waypoint.destination, allDestinations);
  const offersByType = getOffersByType(waypoint.type, allOffers);

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

  const createOffersByTypeTemplate = () => (offersByType.map((offer, offerIndex) => {
    const checked = waypoint.offers.includes(offer.id) ? 'checked' : '';
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

  const createDestinationOptionsTemplate = () => (allDestinations.map((destinationItem) => (
    `<option value="${destinationItem.name}"></option>`
  )).join(''));

  const createPhotosTemplate = (pictures) => (pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="Event photo">`
  )).join(''));

  const createPhotosContainerTemplate = () => {
    if ('pictures' in foundDestination) {
      return `<div class="event__photos-container">
      <div class="event__photos-tape">
       ${createPhotosTemplate(foundDestination.pictures)}
      </div>
    </div>`;
    } else {
      return '';
    }
  };

  const createDestinationsContainerTemplate = () => `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${foundDestination.description}</p>
      ${createPhotosContainerTemplate()}
    </section>`;

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
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${foundDestination.name}" list="destination-list-1">
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
  #allOffers = null;
  #allDestinations = null;

  constructor(waypoint = DEFAULT_WAY_POINT, allDestinations = [], allOffers = []) {
    super();
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this._state = FormEditView.parseWaypointToState(waypoint);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#allDestinations, this.#allOffers);
  }

  static parseWaypointToState = (waypoint) => ({
    ...waypoint
  });

  static parseStateToWaypoint = (state) => ({
    ...state
  });

  #setInnerHandlers = () => {
    Array.from(this.element.querySelectorAll('.event__type-input')).forEach((typeElement) => typeElement
      .addEventListener('click', this.#eventTypeHandler));
    // this.element.querySelector('.event__input--destination').addEventListener('submit', this.#eventDestinationHandler);
  };

  // #eventDestinationHandler = (event) => {
  //   const destinationId = this.#allDestination.find((destination) => destination.name === event.target.value);
  //   this.updateElement({
  //     destination: destinationId,
  //   });
  // };

  #eventTypeHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      type: event.target.value,
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
