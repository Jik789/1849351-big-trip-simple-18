// @ts-nocheck

import {render, RenderPosition} from '../framework/render.js';
import EventListView from '../view/event-list-view';
import NoWaypointView from '../view/no-waypoint-view';
import SortView from '../view/sort-view';
import WaypointPresenter from './waypoint-presenter';
import { updateItem, sortWaypointDay, sortWaypointPrice } from '../utils/utils';
import { SortType } from '../const.js';

export default class BoardPresenter {
  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #noWaypointComponent = new NoWaypointView();

  #waypointPresenter = new Map();
  #currentSortType = SortType.DAY;
  boardWaypoints = [];
  sourcedWaypoints = [];

  #parentContainer = null;
  #waypointsModel = null;

  constructor(parentContainer, waypointsModel) {
    this.#parentContainer = parentContainer;
    this.#waypointsModel = waypointsModel;
  }

  init = () => {
    this.boardWaypoints = [...this.#waypointsModel.waypoints];
    this.sourcedWaypoints = [...this.#waypointsModel.waypoints];

    this.#renderSort();
    this.#renderEventList();

    this.#sortWaypoints(this.#currentSortType);
  };

  get waypoints() {
    return this.#waypointsModel.waypoints;
  }

  #renderWayPoints = (wayPoint) => {
    const waypointPresenter = new WaypointPresenter(this.#eventListComponent.element, this.#handleWaypointChange, this.#handleModeChange);
    waypointPresenter.init(wayPoint);
    this.#waypointPresenter.set(wayPoint.id, waypointPresenter);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#parentContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEventList = () => {
    render(this.#eventListComponent, this.#parentContainer);
  };

  #renderNowayPoints = () => {
    render(this.#noWaypointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearWaypointList = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();

  };

  #handleWaypointChange = (waypointUpdate) => {
    this.boardWaypoints = updateItem(this.boardWaypoints, waypointUpdate);
    this.sourcedWaypoints = updateItem(this.sourcedWaypoints, waypointUpdate);
    this.#waypointPresenter.get(waypointUpdate.id).init(waypointUpdate);
  };

  #handleModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortWaypoints(sortType);
  };

  #sortWaypoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.boardWaypoints.sort(sortWaypointDay);
        break;
      case SortType.PRICE:
        this.boardWaypoints.sort(sortWaypointPrice);
        break;
      default:
        this.boardWaypoints = [...this.sourcedWaypoints];
    }

    this.#currentSortType = sortType;
    this.#clearWaypointList();

    if (!(this.boardWaypoints.length > 0)) {
      this.#renderNowayPoints();
    } else {
      for (let i = 0; i < this.boardWaypoints.length; i++) {
        this.#renderWayPoints(this.boardWaypoints[i]);
      }
    }
  };
}
