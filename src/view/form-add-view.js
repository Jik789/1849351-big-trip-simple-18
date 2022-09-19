// @ts-nocheck
// import { humanizeDateTime } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { DEFAULT_WAY_POINT, WAYPOINT_TYPE_MOCK } from '../mock/const-mock.js';
// import { toUpperCaseFirstLetter, getDestination, getOffersByType } from '../utils/utils';
// import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createFormAddTemplate = (waypoint) => `
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">Add luggage</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">30</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
          <label class="event__offer-label" for="event-offer-comfort-1">
            <span class="event__offer-title">Switch to comfort class</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">100</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
          <label class="event__offer-label" for="event-offer-meal-1">
            <span class="event__offer-title">Add meal</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">15</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
          <label class="event__offer-label" for="event-offer-seats-1">
            <span class="event__offer-title">Choose seats</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">5</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
          <label class="event__offer-label" for="event-offer-train-1">
            <span class="event__offer-title">Travel by train</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">40</span>
          </label>
        </div>
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
        </div>
      </div>
    </section>
  </section>
</form>
</li>
`;

export default class FormAddView extends AbstractStatefulView {
  // #allOffers = null;
  // #allDestinations = null;

  // #datepickerStart = null;
  // #datepickerEnd = null;

  constructor(waypoint = DEFAULT_WAY_POINT) {
    super();
    this._state = FormAddView.parseWaypointToState(waypoint);
    // this.#allDestinations = allDestinations;
    // this.#allOffers = allOffers;
    // this._state = FormAddView.parseWaypointToState(waypoint);
    // this.#setInnerHandlers();
    // this.#setDatepickerStart();
    // this.#setDatepickerEnd();
  }

  get template() {
    console.log(this._state);
    return createFormAddTemplate(this._state);
  }

  static parseWaypointToState = (waypoint) => ({
    ...waypoint
  });

  static parseStateToWaypoint = (state) => ({
    ...state
  });

  // #setInnerHandlers = () => {
  //   Array.from(this.element.querySelectorAll('.event__type-input')).forEach((typeElement) => typeElement.addEventListener('click', this.#eventTypeHandler));
  //   this.element.querySelector('.event__input--price').addEventListener('change', this.#eventPriceHandler);
  //   this.element.querySelector('.event__available-offers').addEventListener('change', this.#eventOfferHandler);
  //   this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationHandler);
  // };

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  // removeElement = () => {
  //   super.removeElement();

  //   if (this.#datepickerStart) {
  //     this.#datepickerStart.destroy();
  //     this.#datepickerStart = null;
  //   }

  //   if (this.#datepickerEnd) {
  //     this.#datepickerEnd.destroy();
  //     this.#datepickerEnd = null;
  //   }
  // };

  // #eventTimeStartHandler = ([userDate]) => {
  //   this._setState({
  //     dateFrom: userDate,
  //   });
  // };

  // #eventTimeEndHandler = ([userDate]) => {
  //   this._setState({
  //     dateTo: [userDate],
  //   });
  // };

  // #eventDestinationHandler = (evt) => {
  //   evt.preventDefault();
  //   if (evt.target.value !== '') {
  //     this.updateElement({
  //       destination: this.#allDestinations.find((destination) => evt.target.value === destination.name).id,
  //     });
  //   }
  // };

  // #eventTypeHandler = (event) => {
  //   event.preventDefault();
  //   this.updateElement({
  //     type: event.target.value,
  //     offers: [],
  //   });
  // };

  // #eventPriceHandler = (evt) => {
  //   evt.preventDefault();
  //   this._setState({
  //     basePrice: evt.target.value,
  //   });
  // };

  // #eventOfferHandler = (event) => {
  //   event.preventDefault();
  //   const currentOffers = Array.from(this._state.offers);
  //   const offerId = Number(event.target.dataset.index);

  //   if (event.target.checked) {
  //     currentOffers.push(offerId);
  //   }

  //   if (!event.target.checked) {
  //     currentOffers.splice(currentOffers.indexOf(offerId), 1);
  //   }

  //   this.updateElement({
  //     offers: currentOffers
  //   });
  // };

  // _restoreHandlers = () => {
  //   this.#setInnerHandlers();
  //   this.setSubmitHandler(this._callback.submit);
  //   this.setClickHandler(this._callback.click);
  //   this.#setDatepickerStart();
  //   this.#setDatepickerEnd();
  //   this.setDeleteClickHandler(this._callback.deleteClick);
  // };

  // #setDatepickerStart = () => {
  //   this.#datepickerStart = flatpickr(
  //     this.element.querySelector('#event-start-time-1'),
  //     {
  //       enableTime: true,
  //       'time_24hr': true,
  //       dateFormat: 'd/m/y H:i',
  //       defaultDate: this._state.dateFrom,
  //       onClose: this.#eventTimeStartHandler,
  //     },
  //   );
  // };

  // #setDatepickerEnd = () => {
  //   this.#datepickerStart = flatpickr(
  //     this.element.querySelector('#event-end-time-1'),
  //     {
  //       enableTime: true,
  //       'time_24hr': true,
  //       dateFormat: 'd/m/y H:i',
  //       defaultDate: this._state.dateTo,
  //       minDate: this._state.dateFrom,
  //       onClose: this.#eventTimeEndHandler,
  //     },
  //   );
  // };

  setFormSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };


  #formSubmitHandler = (event) => {
    event.preventDefault();
    this._callback.submit(FormAddView.parseStateToWaypoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormAddView.parseStateToWaypoint(this._state));
  };

  // reset = (waypoint) => {
  //   this.updateElement(
  //     FormEditView.parseWaypointToState(waypoint),
  //   );
  // };
}
