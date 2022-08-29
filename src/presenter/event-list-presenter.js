// @ts-nocheck

import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view';
import WaypointModel from '../model/waypoint-model';
import NoWaypointView from '../view/no-waypoint-view';
import WaypointPresenter from './waypoint-presenter';

export default class EventListPresenter {
  #eventListComponent = new EventListView();
  #noWaypointComponent = new NoWaypointView();

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    this.#renderEventList();

    if (!(this.waypoints.length > 0)) {
      this.#renderNoWayPoints();
    } else {
      for (let i = 0; i < this.waypoints.length; i++) {
        this.#renderWayPoints(this.waypoints[i]);
      }
    }
  };

  #renderWayPoints = (wayPoint) => {
    const waypointPresenter = new WaypointPresenter(this.#eventListComponent.element);
    waypointPresenter.init(wayPoint);
  };

  #renderNoWayPoints = () => {
    render(this.#noWaypointComponent, this.#eventListComponent.element);
  };

  #renderEventList = () => {
    render(this.#eventListComponent, this.parentContainer);
  };
}
