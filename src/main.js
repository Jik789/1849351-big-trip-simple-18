// @ts-nocheck

import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter';
import WaypointModel from './model/waypoint-model.js';
import FilterModel from './model/filter-model.js';
import WaypointsApiService from './waypoints-api-service';

const AUTHORIZATION = 'Basic jewelhuxJik789';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

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

const handleNewWaypointButtonClick = () => {
  boardPresenter.createWaypoint(handleNewWaypointFormClose);
  addWaypointButtonElement.disabled = true;
};

addWaypointButtonElement.addEventListener('click', handleNewWaypointButtonClick);
addWaypointButtonElement.disabled = true;

boardPresenter.init();
filterPresenter.init();
waypointModel.init()
  .finally(() => {
    addWaypointButtonElement.disabled = false;
  });
