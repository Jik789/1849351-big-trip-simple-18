// @ts-nocheck

import { render } from '../render.js';
import EventListView from '../view/event-list-view';
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import WaypointModel from '../model/waypoint-model';
import NoWaypointView from '../view/no-waypoint-view';

export default class EventListPresenter {
  #eventListComponent = new EventListView();

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    render(this.#eventListComponent, this.parentContainer);

    if (!(this.waypoints.length > 0)) {
      render(new NoWaypointView(), this.#eventListComponent.element);
    } else {
      for (let i = 0; i < this.waypoints.length; i++) {
        this.#renderWayPoints(this.waypoints[i]);
      }
    }
  };

  #renderWayPoints = (wayPoint) => {
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    const waypointComponent = new WaypointView(
      wayPoint,
      this.waypointsModel.getWaypointOffers(wayPoint),
      this.waypointsModel.getWaypointDestinations(wayPoint)
    );
    const waypointComponentEdit = new FormEditView(
      wayPoint,
      this.waypointsModel.getWaypointOffers(wayPoint),
      this.waypointsModel.getWaypointDestinations(wayPoint),
      this.waypointsModel.getWaypointOffersByType(wayPoint)
    );

    const replaceCardToForm = () => {
      this.#eventListComponent.element.replaceChild(waypointComponentEdit.element, waypointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#eventListComponent.element.replaceChild(waypointComponent.element, waypointComponentEdit.element);
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

    render(waypointComponent, this.#eventListComponent.element);
  };
}
