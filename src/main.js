// @ts-nocheck

import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import EventListView from './view/event-list';
import FormAddView from './view/form-add-view';
import FormEditView from './view/form-edit-view';
import WaypointView from './view/waypoint-view';
import { render } from './render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);
render(new SortView(), siteTripEventElement);
render(new EventListView(), siteTripEventElement);

const siteEventListElement = document.querySelector('.trip-events__list');
render(new FormEditView(), siteEventListElement);
render(new FormAddView(), siteEventListElement);
render(new WaypointView(), siteEventListElement);
render(new WaypointView(), siteEventListElement);
render(new WaypointView(), siteEventListElement);
