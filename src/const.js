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
  id: null,
  basePrice: 100,
  dateFrom: new Date,
  dateTo: new Date,
  destination: 1,
  offers: [],
  type: WAYPOINT_TYPE[0],
};

const UNIT_DATE = 'minute';

const AUTHORIZATION = 'Basic jewelhuxJik789';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const NO_WAYPOINT_TEXT = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

export {SortType, UserAction, UpdateType, FilterType, DEFAULT_WAY_POINT, WAYPOINT_TYPE, UNIT_DATE, AUTHORIZATION, END_POINT, NO_WAYPOINT_TEXT};
