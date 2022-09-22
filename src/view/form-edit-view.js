// @ts-nocheck

import { humanizeDateTime } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { WAYPOINT_TYPE } from '../const';
import { DEFAULT_WAY_POINT, DEFAULT_DESTINATION} from '../const.js';
import { toUpperCaseFirstLetter, getDestination, getOffersByType } from '../utils/utils';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createFormEditTemplate = (waypoint, allOffers, allDestinations) => {
  const dateFrom = waypoint.dateFrom;
  const dateTo = waypoint.dateTo;

  const destinationById = waypoint.destination ? getDestination(waypoint.destination, allDestinations) : DEFAULT_DESTINATION; // НАСКОЛЬКО КОРРЕКТНО БЫЛО ТАК ДЕЛАТЬ?
  const offersByType = getOffersByType(waypoint.type, allOffers);

  const dateTimeFromReadble = humanizeDateTime(dateFrom);
  const dateTimeToReadble = humanizeDateTime(dateTo);

  const createEventTypeListTemplate = () => (WAYPOINT_TYPE.map((wayPointType) => {
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
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerIndex}" data-index="${offer.id}" type="checkbox" name="event-offer-luggage" ${checked}>
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
    if ('pictures' in destinationById) {
      return `<div class="event__photos-container">
      <div class="event__photos-tape">
       ${createPhotosTemplate(destinationById.pictures)}
      </div>
    </div>`;
    } else {
      return '';
    }
  };

  const createDestinationsContainerTemplate = () => `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationById.description}</p>
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
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationById.name}" list="destination-list-1">
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

  #datepickerStart = null;
  #datepickerEnd = null;

  constructor(waypoint = DEFAULT_WAY_POINT, allOffers = [], allDestinations = []) {
    super();
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this._state = FormEditView.parseWaypointToState(waypoint);
    this.#setInnerHandlers();
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  static parseWaypointToState = (waypoint) => ({
    ...waypoint
  });

  static parseStateToWaypoint = (state) => ({
    ...state
  });

  #setInnerHandlers = () => {
    Array.from(this.element.querySelectorAll('.event__type-input')).forEach((typeElement) => typeElement.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--price').addEventListener('change', this.#eventPriceHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#eventOfferHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationHandler);
  };

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement = () => {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  };

  #eventTimeStartHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #eventTimeEndHandler = ([userDate]) => {
    this._setState({
      dateTo: [userDate],
    });
  };

  #eventDestinationHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value !== '') {
      this.updateElement({
        destination: this.#allDestinations.find((destination) => evt.target.value === destination.name).id,
      });
    }
  };

  #eventTypeHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      type: event.target.value,
      offers: [],
    });
  };

  #eventPriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #eventOfferHandler = (event) => {
    event.preventDefault();
    const currentOffers = Array.from(this._state.offers);
    const offerId = Number(event.target.dataset.index);

    if (event.target.checked) {
      currentOffers.push(offerId);
    }

    if (!event.target.checked) {
      currentOffers.splice(currentOffers.indexOf(offerId), 1);
    }

    this.updateElement({
      offers: currentOffers
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitHandler(this._callback.submit);
    this.setClickHandler(this._callback.click);
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #setDatepickerStart = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onClose: this.#eventTimeStartHandler,
      },
    );
  };

  #setDatepickerEnd = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#eventTimeEndHandler,
      },
    );
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

  reset = (waypoint) => {
    this.updateElement(
      FormEditView.parseWaypointToState(waypoint),
    );
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormEditView.parseStateToWaypoint(this._state));
  };
}
