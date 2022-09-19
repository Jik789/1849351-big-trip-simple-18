// @ts-nocheck
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import { render, replace, remove } from '../framework/render.js';
import WaypointModel from '../model/waypoint-model';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/utils';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class WaypointPresenter {
  #waypointListContainer = null;
  #waypointComponent = null;
  #waypointComponentEdit = null;
  #changeData = null;
  #changeMode = null;

  #waypoint = null;
  #mode = Mode.DEFAULT;

  constructor(waypointListContainer, changeData, changeMode) {
    this.#waypointListContainer = waypointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (waypoint) => {
    this.#waypoint = waypoint;
    this.waypointsModel = new WaypointModel();
    this.waypoints = this.waypointsModel.waypoints;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointComponentEdit = this.#waypointComponentEdit;

    this.#waypointComponent = new WaypointView(
      waypoint,
      this.waypointsModel.getWaypointOffers(waypoint),
      this.waypointsModel.getWaypointDestinations(waypoint)
    );

    this.#waypointComponentEdit = new FormEditView(
      waypoint,
      this.waypointsModel.allOffers,
      this.waypointsModel.allDestinations
    );

    this.#waypointComponent.setClickHandler(this.#setClickCardToForm);
    this.#waypointComponentEdit.setClickHandler(this.#setClickFormToCard);
    this.#waypointComponentEdit.setSubmitHandler(this.#setSubmitHandler);
    this.#waypointComponentEdit.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevWaypointComponent === null || prevWaypointComponentEdit === null) {
      render(this.#waypointComponent, this.#waypointListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointComponentEdit, prevWaypointComponentEdit);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointComponentEdit);
  };

  destroy = () => {
    remove(this.#waypointComponent);
    remove(this.#waypointComponentEdit);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#waypointComponentEdit.reset(this.#waypoint);
      this.#replaceFormToCard();
    }
  };

  #onEscKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.#waypointComponentEdit.reset(this.#waypoint);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #replaceCardToForm = () => {
    replace(this.#waypointComponentEdit, this.#waypointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#waypointComponent, this.#waypointComponentEdit);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #setClickCardToForm = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #setClickFormToCard = () => {
    this.#waypointComponentEdit.reset(this.#waypoint);
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #setSubmitHandler = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#waypoint.dueDate, update.dueDate);

    this.#changeData(
      UserAction.UPDATE_TASK,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (waypoint) => {
    this.#changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      waypoint,
    );
    this.#replaceFormToCard();
  };
}
