import { nanoid } from 'nanoid';

const WAYPOINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const SortType = {
  DAY: 'day',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const DEFAULT_WAY_POINT = {
  id: nanoid(),
  basePrice: 100,
  dateFrom: new Date,
  dateTo: new Date,
  destination: 1,
  offers: [],
  type: WAYPOINT_TYPE[0],
};

const UNIT_DATE = 'minute';

export {SortType, UserAction, UpdateType, FilterType, DEFAULT_WAY_POINT, WAYPOINT_TYPE, UNIT_DATE};
