import { WAYPOINT_COUNT } from '../mock/const-mock';
import { destinationMock } from '../mock/destination-mock';
import { offerMock } from '../mock/offer-mock';
import { waypointMock } from '../mock/waypoint-mock';

export default class WaypointModel {
  wayPoints = Array.from({length: WAYPOINT_COUNT}, waypointMock);
  destinations = Array.from({length: WAYPOINT_COUNT}, (_value, index) => destinationMock(index + 1));
  offers = Array.from({length: WAYPOINT_COUNT}, (_value, index) => offerMock(index + 1));

  getWaypoints = () => this.wayPoints;

  getWaypointDestinations = (wayPoint) => this.destinations.find((destination) => wayPoint.destination === destination.id);

  getWaypointOffers = (wayPoint) => wayPoint.offers.map((offerId) => this.offers.find((offer) => offer.id === offerId));
}

// const obj = {
//   'basePrice': 123,
//   'dateFrom': 456,
//   'destination': 2,
//   'offers': [1, 2],
//   'type': 789,
// }

// const test = new WaypointModel()
// console.log(test.getWaypointOffers(obj));
