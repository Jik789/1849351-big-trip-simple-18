// @ts-nocheck

import FilterView from './view/filter-view';
import {render} from './render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');

render(new FilterView(), siteFilterElement);
