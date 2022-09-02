// @ts-nocheck
import { WAYPOINT_COUNT } from '../mock/const-mock';
import { destinationMock } from '../mock/destination-mock';
import { offerMock } from '../mock/offer-mock';
import { waypointMock } from '../mock/waypoint-mock';

export default class WaypointModel {
  #wayPoints = Array.from({length: WAYPOINT_COUNT}, (_value, index) => waypointMock(index + 1));
  #allDestinations = Array.from({length: WAYPOINT_COUNT}, (_value, index) => destinationMock(index + 1));
  #allOffers = offerMock();

  get waypoints() {
    return this.#wayPoints;
  }

  get allDestinations() {
    return this.#allDestinations;
  }

  getWaypointDestinations = (wayPoint) => this.#allDestinations.find((destination) => wayPoint.destination === destination.id);

  getWaypointOffers = (wayPoint) => this.getWaypointOffersByType(wayPoint).filter((offer) => wayPoint.offers.includes(offer.id));

  getWaypointOffersByType = (wayPoint) => this.#allOffers.find((offer) => offer.type === wayPoint.type).offers;
}
