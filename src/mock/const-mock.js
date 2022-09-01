const WAYPOINT_COUNT = 4;

const BASE_PRICE_MOCK = [500, 600, 700, 800, 900, 1000];
const DATE_FROM_MOCK = ['2019-06-10T12:25:56.845Z', '2019-06-13T10:53:56.845Z', '2019-06-15T07:37:56.845Z', '2019-06-22T18:44:56.845Z'];
const DATE_TO_MOCK = ['2019-07-12T11:58:56.845Z', '2019-07-16T16:34:56.845Z', '2019-07-18T12:27:56.845Z', '2019-07-25T13:23:56.845Z'];
const WAYPOINT_TYPE_MOCK = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const NAME_MOCK = ['Москва', 'Париж', 'Нью-Йорк', 'Пекин', 'Киев', 'Будапешт'];

const DEFAULT_WAY_POINT = {
  id: 0,
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  offers: [],
  type: WAYPOINT_TYPE_MOCK[0],
};

export {BASE_PRICE_MOCK, DATE_FROM_MOCK, DATE_TO_MOCK, WAYPOINT_TYPE_MOCK, NAME_MOCK, WAYPOINT_COUNT, DEFAULT_WAY_POINT};
