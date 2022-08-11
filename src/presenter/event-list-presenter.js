import EventListView from '../view/event-list-view';
import FormAddView from '../view/form-add-view';
import FormEditView from '../view/form-edit-view';
import WaypointView from '../view/waypoint-view';
import { render } from '../render.js';

export default class EventListPresenter {
  EventListComponent = new EventListView();

  init = (parentContainer) => {
    this.parentContainer = parentContainer;

    render(this.EventListComponent, this.parentContainer);
    render(new FormEditView(), this.EventListComponent.getElement());
    render(new FormAddView(), this.EventListComponent.getElement());

    for (let i = 0; i < 3; i += 1) {
      render(new WaypointView(), this.EventListComponent.getElement());
    }
  };
}
