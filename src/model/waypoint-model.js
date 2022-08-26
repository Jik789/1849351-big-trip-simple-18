import { WAYPOINT_COUNT } from '../mock/const-mock';
import { destinationMock } from '../mock/destination-mock';
import { offerMock, offerByTypeMock } from '../mock/offer-mock';
import { waypointMock } from '../mock/waypoint-mock';

export default class WaypointModel {
  #wayPoints = Array.from({length: 0}, (_value, index) => waypointMock(index + 1));
  #destinations = Array.from({length: WAYPOINT_COUNT}, (_value, index) => destinationMock(index + 1));
  #offers = Array.from({length: WAYPOINT_COUNT}, (_value, index) => offerMock(index + 1));
  #offersByType = offerByTypeMock();

  get waypoints() {
    return this.#wayPoints;
  }

  getWaypointDestinations = (wayPoint) => this.#destinations.find((destination) => wayPoint.destination === destination.id);

  getWaypointOffers = (wayPoint) => wayPoint.offers.map((offerId) => this.#offers.find((offer) => offer.id === offerId));

  getWaypointOffersByType = (wayPoint) => this.#offersByType.find((offerType) => offerType.type === wayPoint.type);
}
