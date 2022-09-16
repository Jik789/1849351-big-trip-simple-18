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

  getWaypointDestinations = (wayPoint) => getDestination(wayPoint.destination, this.#allDestinations);
  getWaypointOffers = (wayPoint) => getOffersByType(wayPoint.type, this.#allOffers).filter((offer) => wayPoint.offers.includes(offer.id));
}
