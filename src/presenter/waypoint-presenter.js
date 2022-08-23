// @ts-nocheck

import { render } from '../render.js';
import EventListView from '../view/event-list-view';
import FormAddView from '../view/form-add-view';
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import WaypointModel from '../model/waypoint-model';

export default class EventListPresenter {
  #EventListComponent = new EventListView();

  init = (parentContainer) => {
    this.parentContainer = parentContainer;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    render(this.#EventListComponent, this.parentContainer);
    // render(new FormAddView(), this.EventListComponent.getElement());


    for (let i = 0; i < this.waypoints.length; i++) {
      this.#renderWayPoints(i);
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
      this.#EventListComponent.getElement().replaceChild(waypointComponentEdit.getElement(), waypointComponent.getElement());
    };

    const replaceFormToCard = () => {
      this.#EventListComponent.getElement().replaceChild(waypointComponent.getElement(), waypointComponentEdit.getElement());
    };

    const onEscKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    waypointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    waypointComponentEdit.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    waypointComponentEdit.getElement().querySelector('.event--edit').addEventListener('submit', (event) => {
      event.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(waypointComponent, this.#EventListComponent.getElement());
  };
}
