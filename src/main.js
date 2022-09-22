// @ts-nocheck

// import { render } from './render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter';
import WaypointModel from './model/waypoint-model.js';
import FilterModel from './model/filter-model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');
const addWaypointButtonElement = document.querySelector('.trip-main__event-add-btn');

const waypointModel = new WaypointModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(siteTripEventElement, waypointModel, filterModel);
boardPresenter.init();

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, waypointModel);
filterPresenter.init();

const handleNewWaypointFormClose = () => {
  addWaypointButtonElement.disabled = false;
};

const handleNewWaypointButtonClick = () => {
  boardPresenter.createWaypoint(handleNewWaypointFormClose);
  addWaypointButtonElement.disabled = true;
};

addWaypointButtonElement.addEventListener('click', handleNewWaypointButtonClick);
