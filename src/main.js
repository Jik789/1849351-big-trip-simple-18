// @ts-nocheck

import { render } from './render.js';
import FilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import WaypointModel from './model/waypoint-model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');
const waypointModel = new WaypointModel();

render(new FilterView(), siteFilterElement);

const eventListPresenter = new BoardPresenter(siteTripEventElement, waypointModel);
eventListPresenter.init();


