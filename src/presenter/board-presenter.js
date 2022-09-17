// @ts-nocheck

import {render, RenderPosition, remove} from '../framework/render.js';
import EventListView from '../view/event-list-view';
import NoWaypointView from '../view/no-waypoint-view';
import SortView from '../view/sort-view';
import WaypointPresenter from './waypoint-presenter';
import { sortWaypointDay, sortWaypointPrice } from '../utils/utils';
import {SortType, UpdateType, UserAction} from '../const.js';

export default class BoardPresenter {
  #eventListComponent = new EventListView();
  #sortComponent = null;
  #noWaypointComponent = new NoWaypointView();

  #waypointPresenter = new Map();
  #currentSortType = SortType.DAY;

  #parentContainer = null;
  #waypointsModel = null;

  constructor(parentContainer, waypointsModel) {
    this.#parentContainer = parentContainer;
    this.#waypointsModel = waypointsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
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

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#waypointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#waypointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#waypointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#waypointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };


  #renderWayPoints = (wayPoint) => {
    const waypointPresenter = new WaypointPresenter(this.#eventListComponent.element, this.#handleViewAction, this.#handleModeChange);
    waypointPresenter.init(wayPoint);
    this.#waypointPresenter.set(wayPoint.id, waypointPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#parentContainer);
  };

  #renderNoWayPoints = () => {
    render(this.#noWaypointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #handleModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noWaypointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard = () => {
    const waypoints = this.waypoints;
    const waypointsCount = waypoints.length;

    this.#renderSort();

    render(this.#eventListComponent, this.#parentContainer);
    if (waypointsCount === 0) {
      this.#renderNoWayPoints();
      return;
    }

    for (let i = 0; i < waypointsCount; i++) {
      this.#renderWayPoints(this.waypoints[i]);
    }
  };
}

