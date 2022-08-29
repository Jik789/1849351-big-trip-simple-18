// @ts-nocheck

import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view';
import WaypointModel from '../model/waypoint-model';
import NoWaypointView from '../view/no-waypoint-view';
import WaypointPresenter from './waypoint-presenter';

export default class EventListPresenter {
  #eventListComponent = new EventListView();

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    render(this.#eventListComponent, this.parentContainer);

    if (!(this.waypoints.length > 0)) {
      render(new NoWaypointView(), this.#eventListComponent.element);
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
}
