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

  #parentContainer = null;
  #waypointsModel = null;

  constructor(parentContainer, waypointsModel) {
    this.#parentContainer = parentContainer;
    this.#waypointsModel = waypointsModel;
  }

  init = () => {
    this.#renderBoard();
  };

  get waypoints() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#waypointsModel.waypoints].sort(sortWaypointDay);
      case SortType.PRICE:
        return [...this.#waypointsModel.waypoints].sort(sortWaypointPrice);
    }
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

  #renderNoWayPoints = () => {
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
    this.#currentSortType = sortType;
    this.#clearWaypointList();
    this.#renderWaypointsList();
  };

  #renderWaypointsList = () => {
    for (let i = 0; i < this.waypoints.length; i++) {
      this.#renderWayPoints(this.waypoints[i]);
    }
  };

  #renderBoard = () => {
    this.#renderSort();

    render(this.#eventListComponent, this.#parentContainer);
    if (this.waypoints.length === 0) {
      this.#renderNoWayPoints();
      return;
    }

    this.#renderWaypointsList();
  };
}

