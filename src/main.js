// @ts-nocheck

import { render } from './render.js';
import FilterView from './view/filter-view';
import EventListPresenter from './presenter/board-presenter';
import WaypointModel from './model/waypoint-model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);

const eventListPresenter = new EventListPresenter();
eventListPresenter.init(siteTripEventElement);


