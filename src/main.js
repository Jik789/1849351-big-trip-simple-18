// @ts-nocheck

import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import { render } from './render.js';
import EventListPresenter from './presenter/event-list-presenter';
import WaypointModel from './model/waypoint-model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');
const eventListPresenter = new EventListPresenter();
const waypointModel = new WaypointModel();

render(new FilterView(), siteFilterElement);
render(new SortView(), siteTripEventElement);

eventListPresenter.init(siteTripEventElement, waypointModel);
