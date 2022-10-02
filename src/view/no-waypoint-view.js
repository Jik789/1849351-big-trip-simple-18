import AbstractView from '../framework/view/abstract-view.js';
import {NO_WAYPOINT_TEXT} from '../const';

const createNoWaypointTemplate = (filterType) => {
  const noWaypointTextValue = NO_WAYPOINT_TEXT[filterType];

  return (
    `<p class="trip-events__msg">${noWaypointTextValue}</p>`
  );
};

export default class NoWaypointView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoWaypointTemplate(this.#filterType);
  }
}
