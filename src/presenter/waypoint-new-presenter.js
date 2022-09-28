// @ts-nocheck

import {remove, render, RenderPosition} from '../framework/render.js';
import FormAddView from '../view/form-add-view';
import {UserAction, UpdateType} from '../const.js';
import { DEFAULT_WAY_POINT } from '../const.js';

export default class WaypointNewPresenter {
  #waypointsModel = null;
  #waypointListContainer = null;
  #changeData = null;
  #waypointNewComponent = null;
  #destroyCallback = null;

  constructor(waypointsModel, waypointListContainer, changeData) {
    this.#waypointsModel = waypointsModel;
    this.#waypointListContainer = waypointListContainer;
    this.#changeData = changeData;
  }


  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#waypointNewComponent !== null) {
      return;
    }

    this.#waypointNewComponent = new FormAddView(
      DEFAULT_WAY_POINT,
      this.#waypointsModel.allDestinations,
      this.#waypointsModel.allOffers
    );

    this.#waypointNewComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#waypointNewComponent.setCancelClickHandler(this.#handleDeleteClick);
    render(this.#waypointNewComponent, this.#waypointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#waypointNewComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#waypointNewComponent);
    this.#waypointNewComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (waypoint) => {
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      waypoint,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
