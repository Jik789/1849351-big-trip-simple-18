import {offerMock} from '../mock/offer-mock';

export default class OfferModel {
  waypointsModel = null;
  allOffers = offerMock();
  offers = [];

  constructor(waypointsModel) {
    this.waypointsModel = waypointsModel;
    this.offers = offerMock();
  }

  get = (waypoint) => {
    this.offers = waypoint.offers.map((offerId) =>
      this.allOffers.find((offer) =>
        offer.id === offerId));
    return this.offers;
  };
}
