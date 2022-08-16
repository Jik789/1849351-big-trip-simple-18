import WaypointOffersView from '../view/waypoint-offers-view';
import WaypointModel from '../model/waypoint-model';
import { render } from '../render.js';

export default class EventListOffersPresenter {
  init = (parentContainer, offerModel) => {
    this.parentContainer = parentContainer;
    this.offerModel = offerModel;
    this.offers = [...this.offerModel.getTasks()];
    const waypointModels = new WaypointModel().getTasks();

    console.log(waypointModels);
    console.log(this.offers);

    for (let i = 0; i < this.offers.length; i++) {
      render(new WaypointOffersView(this.offers[i]), this.parentContainer);
    }
  };
}
