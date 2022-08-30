// @ts-nocheck

import {render, RenderPosition} from '../framework/render.js';
import EventListView from '../view/event-list-view';
import WaypointModel from '../model/waypoint-model';
import NoWaypointView from '../view/no-waypoint-view';
import SortView from '../view/sort-view';
import WaypointPresenter from './waypoint-presenter';
import { updateItem, sortTaskDown } from '../utils/utils';
import {SortType} from '../const.js';

export default class BoardPresenter {
  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #noWaypointComponent = new NoWaypointView();

  #waypointPresenter = new Map();
  #renderedWaypointCount = null;
  #currentSortType = SortType.DAY;

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();

    this.waypoints = [...this.waypointsModel.waypoints];
    this.sourcedWaypoints = [...this.waypointsModel.waypoints];

    this.#renderSort();
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

  #renderSort = () => {
    render(this.#sortComponent, this.parentContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEventList = () => {
    render(this.#eventListComponent, this.parentContainer);
  };

  #renderNowayPoints = () => {
    render(this.#noWaypointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
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

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  };

  #sortWaypoints = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DAY:
        this.waypoints.sort(sortTaskDown);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.waypoints = [...this.sourcedWaypoints];
    }

    this.#currentSortType = sortType;
  };
}
