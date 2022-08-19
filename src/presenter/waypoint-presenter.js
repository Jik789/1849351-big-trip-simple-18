import { render } from '../render.js';
import EventListView from '../view/event-list-view';
import FormAddView from '../view/form-add-view';
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import WaypointModel from '../model/waypoint-model';

export default class EventListPresenter {
  EventListComponent = new EventListView();

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.getWaypoints();

    render(this.EventListComponent, this.parentContainer);
    render(new FormEditView(
      this.waypoints[0],
      this.waypointsModel.getWaypointOffers(this.waypoints[0]),
      this.waypointsModel.getWaypointDestinations(this.waypoints[0]),
      this.waypointsModel.getWaypointOffersByType(this.waypoints[0])
    ), this.EventListComponent.getElement());
    render(new FormAddView(), this.EventListComponent.getElement());


    for (let i = 0; i < this.waypoints.length; i++) {
      render( new WaypointView(
        this.waypoints[i],
        this.waypointsModel.getWaypointOffers(this.waypoints[i]),
        this.waypointsModel.getWaypointDestinations(this.waypoints[i])
      ), this.EventListComponent.getElement());
    }
  };
}
