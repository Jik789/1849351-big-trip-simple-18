// @ts-nocheck

import { render } from '../render.js';
import EventListView from '../view/event-list-view';
import FormAddView from '../view/form-add-view';
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import WaypointModel from '../model/waypoint-model';

export default class EventListPresenter {
  #EventListComponent = new EventListView();

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    render(this.#EventListComponent, this.parentContainer);
    // render(new FormAddView(), this.EventListComponent.getElement());


    for (let i = 0; i < this.waypoints.length; i++) {
      this.#renderWayPoints(i);
    }
  };

  #renderWayPoints = (wayPointsNumber) => {
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    const waypointComponent = new WaypointView(
      this.waypoints[wayPointsNumber],
      this.waypointsModel.getWaypointOffers(this.waypoints[wayPointsNumber]),
      this.waypointsModel.getWaypointDestinations(this.waypoints[wayPointsNumber])
    );
    const waypointComponentEdit = new FormEditView(
      this.waypoints[wayPointsNumber],
      this.waypointsModel.getWaypointOffers(this.waypoints[wayPointsNumber]),
      this.waypointsModel.getWaypointDestinations(this.waypoints[wayPointsNumber]),
      this.waypointsModel.getWaypointOffersByType(this.waypoints[wayPointsNumber])
    );
    // console.log(waypointComponentEdit.element)

    const replaceCardToForm = () => {
      this.#EventListComponent.element.replaceChild(waypointComponentEdit.element, waypointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#EventListComponent.element.replaceChild(waypointComponent.element, waypointComponentEdit.element);
    };

    render(waypointComponent, this.#EventListComponent.getElement());
  };
}
