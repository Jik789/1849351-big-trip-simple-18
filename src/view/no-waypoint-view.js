// @ts-nocheck
import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const';

const NoWaypointTextType = {
  [FilterType.EVERYTHING]: 'ВАЩЕ НЕТ ТАСКОВ',
  [FilterType.FUTURE]: 'НЕТ ТАСКОВ ПО ФИЛЬТРУ',
};

const createNoWaypointTemplate = (filterType) => {
  const noWaypointTextValue = NoWaypointTextType[filterType];

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
