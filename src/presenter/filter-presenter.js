// @ts-nocheck

import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tasksModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, tasksModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const tasks = this.#tasksModel.waypoints;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
        count: filter[FilterType.EVERYTHING](tasks).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: filter[FilterType.FUTURE](tasks).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
