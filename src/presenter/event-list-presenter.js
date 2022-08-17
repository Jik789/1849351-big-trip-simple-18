import EventListView from '../view/event-list-view';

import FormAddView from '../view/form-add-view';
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import { render } from '../render.js';

export default class EventListPresenter {
  EventListComponent = new EventListView();

  init = (parentContainer, waypointModel) => {
    this.parentContainer = parentContainer;

    this.waypointModel = waypointModel;
    this.boardWypoints = [...this.waypointModel.get()];

    render(this.EventListComponent, this.parentContainer);
    render(new FormEditView(), this.EventListComponent.getElement());
    render(new FormAddView(), this.EventListComponent.getElement());

    for (let i = 0; i < this.boardWypoints.length; i++) {
      render(new WaypointView(this.boardWypoints[i]), this.EventListComponent.getElement());
    }
  };
}
