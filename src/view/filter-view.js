// @ts-nocheck
import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filters) => {
  const createFilterItemTemplate = () => filters.map((filter, index) => {
    const isChecked = index === 0 ? 'checked' : '';
    const isDisabled = filter.noWayPoints ? 'disabled' : '';
    return `<div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${isChecked} ${isDisabled}>
      <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>`;
  }).join('');

  return `<form class="trip-filters" action="#" method="get">
      ${createFilterItemTemplate()}
      <button class="visually-hidden" type="submit">Accept filter</button>
   </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
