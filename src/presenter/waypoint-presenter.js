// @ts-nocheck

import { render } from '../render.js';
import EventListView from '../view/event-list-view';
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import WaypointModel from '../model/waypoint-model';
import NoWaypointView from '../view/no-waypoint-view';

export default class EventListPresenter {
  #EventListComponent = new EventListView();

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    render(this.#EventListComponent, this.parentContainer);

    if (!this.waypoints.length) {
      render(new NoWaypointView(), this.#EventListComponent.element);
    } else {
      for (let i = 0; i < this.waypoints.length; i++) {
        this.#renderWayPoints(i);
      }
    }
  };

  #renderWayPoints = (wayPointsNumber) => {
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    const waypointComponent = new WaypointView(
      this.waypoints[wayPointsNumber],
      this.waypointsModel.getWaypointOffers(this.waypoints[wayPointsNumber]),
      this.waypointsModel.getWaypointDestinations(this.waypoints[wayPointsNumber])
    );
    const waypointComponentEdit = new FormEditView(
      this.waypoints[wayPointsNumber],
      this.waypointsModel.getWaypointOffers(this.waypoints[wayPointsNumber]),
      this.waypointsModel.getWaypointDestinations(this.waypoints[wayPointsNumber]),
      this.waypointsModel.getWaypointOffersByType(this.waypoints[wayPointsNumber])
    );

    const replaceCardToForm = () => {
      this.#EventListComponent.element.replaceChild(waypointComponentEdit.element, waypointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#EventListComponent.element.replaceChild(waypointComponent.element, waypointComponentEdit.element);
    };

    const onEscKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    waypointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    waypointComponentEdit.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    waypointComponentEdit.element.querySelector('.event--edit').addEventListener('submit', (event) => {
      event.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(waypointComponent, this.#EventListComponent.element);
  };
}
