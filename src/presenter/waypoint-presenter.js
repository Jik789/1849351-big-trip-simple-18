import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import { render, replace, remove } from '../framework/render.js';
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
  #waypointsModel = null;
  #waypoint = null;

  #mode = Mode.DEFAULT;

  constructor(waypointsModel, waypointListContainer, changeData, changeMode) {
    this.#waypointsModel = waypointsModel;
    this.#waypointListContainer = waypointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (waypoint) => {
    this.#waypoint = waypoint;
    this.waypoints = this.#waypointsModel.waypoints;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointComponentEdit = this.#waypointComponentEdit;

    this.#waypointComponent = new WaypointView(
      waypoint,
      this.#waypointsModel.getWaypointOffers(waypoint),
      this.#waypointsModel.getWaypointDestinations(waypoint)
    );

    this.#waypointComponentEdit = new FormEditView(
      waypoint,
      this.#waypointsModel.allOffers,
      this.#waypointsModel.allDestinations
    );

    this.#waypointComponent.setClickHandler(this.#setClickCardToForm);
    this.#waypointComponentEdit.setClickHandler(this.#setClickFormToCard);
    this.#waypointComponentEdit.setSubmitHandler(this.#setSubmitHandler);
    this.#waypointComponentEdit.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevWaypointComponent === null || prevWaypointComponentEdit === null) {
      render(this.#waypointComponent, this.#waypointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointComponent, prevWaypointComponentEdit);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevWaypointComponent);
    remove(prevWaypointComponentEdit);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#waypointComponentEdit.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#waypointComponentEdit.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
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
  };

  #handleDeleteClick = (waypoint) => {
    this.#changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      waypoint,
    );
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#waypointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#waypointComponentEdit.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#waypointComponentEdit.shake(resetFormState);
  };
}
