// @ts-nocheck

import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import { render } from './render.js';
import EventListPresenter from './presenter/event-list-presenter';
import EventListOffersPresenter from './presenter/event-list-offers-presenter';
import WaypointModel from './model/waypoint-model.js';
import OfferModel from './model/offer-model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);
render(new SortView(), siteTripEventElement);

const eventListPresenter = new EventListPresenter();
const waypointModel = new WaypointModel();
eventListPresenter.init(siteTripEventElement, waypointModel);

const siteEventListOffersElement = [...document.querySelectorAll('.event__selected-offers')];
for (let i = 0; i < siteEventListOffersElement.length; i++) {
  const eventListOffersPresenter = new EventListOffersPresenter();
  const offerModel = new OfferModel();
  eventListOffersPresenter.init(siteEventListOffersElement[i], offerModel);
}
