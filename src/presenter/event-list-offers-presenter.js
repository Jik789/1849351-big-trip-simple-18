import WaypointOffersView from '../view/waypoint-offers-view';
import { render } from '../render.js';

export default class EventListOffersPresenter {
  init = (parentContainer, offerModel) => {
    this.parentContainer = parentContainer;
    this.offerModel = offerModel;
    this.boardOffers = [...this.offerModel.getTasks()];

    for (let i = 0; i < this.boardOffers.length; i++) {
      render(new WaypointOffersView(this.boardOffers[i]), this.parentContainer);
    }
  };
}
