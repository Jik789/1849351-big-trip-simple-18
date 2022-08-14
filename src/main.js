// @ts-nocheck

import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import { render } from './render.js';
import EventListPresenter from './presenter/event-list-presenter';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');
const eventListPresenter = new EventListPresenter();

render(new FilterView(), siteFilterElement);
render(new SortView(), siteTripEventElement);

eventListPresenter.init(siteTripEventElement);
