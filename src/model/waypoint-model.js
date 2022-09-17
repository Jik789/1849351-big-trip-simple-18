// @ts-nocheck
import { WAYPOINT_COUNT } from '../mock/const-mock';
import { destinationMock } from '../mock/destination-mock';
import { offerMock } from '../mock/offer-mock';
import { waypointMock } from '../mock/waypoint-mock';
import { getDestination, getOffersByType } from '../utils/utils';
import Observable from '../framework/observable.js';

export default class WaypointModel extends Observable {
  #wayPoints = Array.from({length: WAYPOINT_COUNT}, (_value, index) => waypointMock(index + 1));
  #allDestinations = destinationMock();
  #allOffers = offerMock();

  get waypoints() {
    return this.#wayPoints;
  }

  get allDestinations() {
    return this.#allDestinations;
  }

  get allOffers() {
    return this.#allOffers;
  }

  updateTask = (updateType, update) => {
    const index = this.#wayPoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#wayPoints = [
      ...this.#wayPoints.slice(0, index),
      update,
      ...this.#wayPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addTask = (updateType, update) => {
    this.#wayPoints = [
      update,
      ...this.#wayPoints,
    ];

    this._notify(updateType, update);
  };

  deleteTask = (updateType, update) => {
    const index = this.#wayPoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#wayPoints = [
      ...this.#wayPoints.slice(0, index),
      ...this.#wayPoints.slice(index + 1),
    ];

    this._notify(updateType);
  };

  getWaypointDestinations = (wayPoint) => getDestination(wayPoint.destination, this.#allDestinations);
  getWaypointOffers = (wayPoint) => getOffersByType(wayPoint.type, this.#allOffers).filter((offer) => wayPoint.offers.includes(offer.id));
}
