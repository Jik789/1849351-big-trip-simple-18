import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter';
import WaypointModel from './model/waypoint-model.js';
import FilterModel from './model/filter-model.js';
import WaypointsApiService from './waypoints-api-service';
import { AUTHORIZATION, END_POINT } from './const';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');
const addWaypointButtonElement = document.querySelector('.trip-main__event-add-btn');

const filterModel = new FilterModel();
const waypointModel = new WaypointModel(new WaypointsApiService(END_POINT, AUTHORIZATION));
const boardPresenter = new BoardPresenter(siteTripEventElement, waypointModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, waypointModel);

const handleNewWaypointFormClose = () => {
  addWaypointButtonElement.disabled = false;
};

const newWaypointButtonClickHandler = () => {
  boardPresenter.createWaypoint(handleNewWaypointFormClose);
  addWaypointButtonElement.disabled = true;
};

addWaypointButtonElement.addEventListener('click', newWaypointButtonClickHandler);
addWaypointButtonElement.disabled = true;

boardPresenter.init();
filterPresenter.init();
waypointModel.init()
  .finally(() => {
    addWaypointButtonElement.disabled = false;
  });
