// @ts-nocheck

import {remove, render, RenderPosition} from '../framework/render.js';
import FormAddView from '../view/form-add-view';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class WaypointNewPresenter {
  #waypointListContainer = null;
  #changeData = null;
  #waypointNewComponent = null;
  #destroyCallback = null;

  constructor(waypointListContainer, changeData) {
    this.#waypointListContainer = waypointListContainer;
    this.#changeData = changeData;
  }


  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#waypointNewComponent !== null) {
      return;
    }

    this.#waypointNewComponent = new FormAddView();
    this.#waypointNewComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#waypointNewComponent.setDeleteClickHandler(this.#handleDeleteClick);
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
    console.log(waypoint)
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...waypoint},
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
