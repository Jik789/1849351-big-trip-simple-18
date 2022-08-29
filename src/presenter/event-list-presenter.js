// @ts-nocheck

import { render } from '../framework/render.js';
import EventListView from '../view/event-list-view';
import WaypointModel from '../model/waypoint-model';
import NoWaypointView from '../view/no-waypoint-view';
import WaypointPresenter from './waypoint-presenter';
import { updateItem } from '../utils/utils';

export default class EventListPresenter {
  #eventListComponent = new EventListView();
  #noWaypointComponent = new NoWaypointView();
  #waypointPresenter = new Map();
  #renderedWaypointCount = null;

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    this.#renderEventList();

    if (!(this.waypoints.length > 0)) {
      this.#renderNowayPoints();
    } else {
      for (let i = 0; i < this.waypoints.length; i++) {
        this.#renderWayPoints(this.waypoints[i]);
      }
    }
  };

  #renderWayPoints = (wayPoint) => {
    const waypointPresenter = new WaypointPresenter(this.#eventListComponent.element, this.#handleWaypointChange, this.#handleModeChange);
    waypointPresenter.init(wayPoint);
    this.#waypointPresenter.set(wayPoint.id, waypointPresenter);
  };

  #renderNowayPoints = () => {
    render(this.#noWaypointComponent, this.#eventListComponent.element);
  };

  #renderEventList = () => {
    render(this.#eventListComponent, this.parentContainer);
  };

  #clearWaypointList = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();

  };

  #handleWaypointChange = (waypointUpdate) => {
    this.waypoints = updateItem(this.waypoints, waypointUpdate);
    this.#waypointPresenter.get(waypointUpdate.id).init(waypointUpdate);
  };

  #handleModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };
}
