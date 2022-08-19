// @ts-nocheck

import { render } from './render.js';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import EventListPresenter from './presenter/waypoint-presenter';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);
render(new SortView(), siteTripEventElement);

const eventListPresenter = new EventListPresenter();
eventListPresenter.init(siteTripEventElement);


