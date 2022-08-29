// @ts-nocheck
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import { render, replace } from '../framework/render.js';
import WaypointModel from '../model/waypoint-model';

export default class WaypointPresenter {
  #taskListContainer = null;
  #waypointComponent = null;
  #waypointComponentEdit = null;

  constructor(taskListContainer) {
    this.#taskListContainer = taskListContainer;
  }

  init = (waypoint) => {
    this.waypoint = waypoint;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    this.#waypointComponent = new WaypointView(
      waypoint,
      this.waypointsModel.getWaypointOffers(waypoint),
      this.waypointsModel.getWaypointDestinations(waypoint)
    );

    this.#waypointComponentEdit = new FormEditView(
      waypoint,
      this.waypointsModel.getWaypointOffers(waypoint),
      this.waypointsModel.getWaypointDestinations(waypoint),
      this.waypointsModel.getWaypointOffersByType(waypoint)
    );

    this.#waypointComponent.setClickHandler(this.#setClickCardToForm);
    this.#waypointComponentEdit.setClickHandler(this.#setClickFormToCard);
    this.#waypointComponentEdit.setSubmitHandler(this.#setSubmitHandler);

    render(this.#waypointComponent, this.#taskListContainer);
  };

  #onEscKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #replaceCardToForm = () => {
    replace(this.#waypointComponentEdit, this.#waypointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToCard = () => {
    replace(this.#waypointComponent, this.#waypointComponentEdit);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #setClickCardToForm = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #setClickFormToCard = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #setSubmitHandler = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
