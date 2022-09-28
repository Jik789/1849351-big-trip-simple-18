// @ts-nocheck

import {render, RenderPosition, remove} from '../framework/render.js';
import EventListView from '../view/event-list-view';
import NoWaypointView from '../view/no-waypoint-view';
import SortView from '../view/sort-view';
import LoadingView from '../view/loading-view.js';
import WaypointPresenter from './waypoint-presenter';
import WaypointNewPresenter from './waypoint-new-presenter';
import { sortWaypointDay, sortWaypointPrice } from '../utils/utils';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import { filter } from '../utils/filter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #eventListComponent = new EventListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #noWaypointComponent = null;

  #waypointPresenter = new Map();
  #waypointNewPresenter = null;
  #currentSortType = SortType.DAY;

  #parentContainer = null;
  #waypointsModel = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(parentContainer, waypointsModel, filterModel) {
    this.#parentContainer = parentContainer;
    this.#waypointsModel = waypointsModel;
    this.#filterModel = filterModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#waypointNewPresenter = new WaypointNewPresenter(this.#waypointsModel, this.#eventListComponent.element, this.#handleViewAction);
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#waypointPresenter.get(update.id).setSaving();
        try {
          await this.#waypointsModel.updateTask(updateType, update);
        } catch(err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TASK:
        this.#waypointNewPresenter.setSaving();
        try {
          await this.#waypointsModel.addTask(updateType, update);
        } catch(err) {
          this.#waypointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TASK:
        this.#waypointPresenter.get(update.id).setDeleting();
        try {
          await this.#waypointsModel.deleteTask(updateType, update);
        } catch(err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };


  #renderWayPoints = (wayPoint) => {
    const waypointPresenter = new WaypointPresenter(this.#waypointsModel, this.#eventListComponent.element, this.#handleViewAction, this.#handleModeChange);
    waypointPresenter.init(wayPoint);
    this.#waypointPresenter.set(wayPoint.id, waypointPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#parentContainer);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#parentContainer, RenderPosition.AFTERBEGIN);
  };


  #renderNoWayPoints = () => {
    this.#noWaypointComponent = new NoWaypointView(this.#filterType);
    render(this.#noWaypointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #handleModeChange = () => {
    this.#waypointNewPresenter.destroy();
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
    this.#waypointNewPresenter.destroy();
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noWaypointComponent) {
      remove(this.#noWaypointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#parentContainer);


    const waypoints = this.waypoints;
    const waypointsCount = waypoints.length;
    if (waypointsCount === 0) {
      this.#renderNoWayPoints();
      return;
    }

    this.waypoints.forEach((element) => this.#renderWayPoints(element));
  };

  createWaypoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#waypointNewPresenter.init(callback);
  };
}

