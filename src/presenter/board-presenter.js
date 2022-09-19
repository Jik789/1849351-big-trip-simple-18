// @ts-nocheck

import {render, RenderPosition, remove} from '../framework/render.js';
import EventListView from '../view/event-list-view';
import NoWaypointView from '../view/no-waypoint-view';
import SortView from '../view/sort-view';
import WaypointPresenter from './waypoint-presenter';
import WaypointNewPresenter from './waypoint-new-presenter';
import { sortWaypointDay, sortWaypointPrice } from '../utils/utils';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import { filter } from '../utils/filter.js';

export default class BoardPresenter {
  #eventListComponent = new EventListView();
  #sortComponent = null;
  #noWaypointComponent = null;

  #waypointPresenter = new Map();
  #waypointNewPresenter = null;
  #currentSortType = SortType.DAY;

  #parentContainer = null;
  #waypointsModel = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;

  constructor(parentContainer, waypointsModel, filterModel) {
    this.#parentContainer = parentContainer;
    this.#waypointsModel = waypointsModel;
    this.#filterModel = filterModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#waypointNewPresenter = new WaypointNewPresenter(this.#eventListComponent.element, this.#handleViewAction);
  }

  init = () => {
    this.#renderBoard();
  };

  get waypoints() {
    this.#filterType = this.#filterModel.filter;
    const tasks = this.#waypointsModel.waypoints;
    const filteredTasks = filter[this.#filterType](tasks);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredTasks.sort(sortWaypointDay);
      case SortType.PRICE:
        return filteredTasks.sort(sortWaypointPrice);
    }
    return filteredTasks;
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
    this.#noWaypointComponent = new NoWaypointView(this.#filterType);
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

    if (this.#noWaypointComponent) {
      remove(this.#noWaypointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
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

    this.waypoints.forEach((element) => this.#renderWayPoints(element));
  };

  createWaypoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#waypointNewPresenter.init(callback);
  };
}

