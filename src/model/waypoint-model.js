// @ts-nocheck
import { getDestination, getOffersByType } from '../utils/utils';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class WaypointModel extends Observable {
  #waypointsApiService = null;
  #waypoints = [];
  #allDestinations = [];
  #allOffers = [];

  constructor(waypointsApiService) {
    super();
    this.#waypointsApiService = waypointsApiService;
  }

  get waypoints() {
    return this.#waypoints;
  }

  get allDestinations() {
    return this.#allDestinations;
  }

  get allOffers() {
    return this.#allOffers;
  }

  init = async () => {
    try { // КАК ПРАВИЛЬНО ТУТ ОБРАБОТАТЬ ОШИБОЧКУ???
      const waypoints = await this.#waypointsApiService.waypoints;
      const allDestinations = await this.#waypointsApiService.allDestinations;
      const allOffers = await this.#waypointsApiService.allOffers;

      this.#waypoints = waypoints.map(this.#adaptToClient);
      this.#allDestinations = allDestinations;
      this.#allOffers = allOffers;

    } catch(err) {
      this.#waypoints = [];
      this.#allDestinations = [];
      this.#allOffers = [];
    }
    this._notify(UpdateType.INIT);
  };

  updateTask = async (updateType, update) => {
    const index = this.#waypoints.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#waypointsApiService.updateWaypoint(update);
      const updatedWaypoint = this.#adaptToClient(response);
      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        updatedWaypoint,
        ...this.#waypoints.slice(index + 1),
      ];
      this._notify(updateType, updatedWaypoint);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  };

  addTask = async (updateType, update) => {
    try {
      const response = await this.#waypointsApiService.addWaypoint(update);
      const newWaypoint = this.#adaptToClient(response);
      this.#waypoints = [newWaypoint, ...this.#waypoints];
      this._notify(updateType, newWaypoint);
    } catch(err) {
      throw new Error('Can\'t add waypoint');
    }
  };

  deleteTask = async (updateType, update) => {
    const index = this.#waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#waypointsApiService.deleteWaypoint(update);
      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        ...this.#waypoints.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  };

  #adaptToClient = (waypoint) => {
    const adaptedWaypoint = {...waypoint,
      dateFrom: waypoint['date_from'] !== null ? new Date(waypoint['date_from']) : waypoint['date_from'],
      dateTo: waypoint['date_to'] !== null ? new Date(waypoint['date_to']) : waypoint['date_to'],
      basePrice: waypoint['base_price'],
    };

    delete adaptedWaypoint['base_price'];
    delete adaptedWaypoint['date_from'];
    delete adaptedWaypoint['date_to'];

    return adaptedWaypoint;
  };

  getWaypointDestinations = (wayPoint) => getDestination(wayPoint.destination, this.#allDestinations);
  getWaypointOffers = (wayPoint) => getOffersByType(wayPoint.type, this.#allOffers).filter((offer) => wayPoint.offers.includes(offer.id));
}
