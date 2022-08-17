// import WaypointOffersView from '../view/waypoint-offers-view';
// import WaypointModel from '../model/waypoint-model';
import { render } from '../render.js';

export default class EventListOffersPresenter {
  init = (parentContainer, offerModel, waypointModel) => {
    this.parentContainer = parentContainer;
    this.offerModel = offerModel;
    this.waypointModel = waypointModel;

    // this.offers = [...this.offerModel.get()];
    // const waypointModels = new WaypointModel().get();

    // for (let i = 0; i < this.offers.length; i++) {
    //   render(new WaypointOffersView(this.offers[i]), this.parentContainer);
    // }
  };
}
