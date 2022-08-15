import { getRandomNumber } from '../utils.js';

export const waypointMock = () => ({
  'basePrice': 1100,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': getRandomNumber(1, 3),
  'id': '0',
  'offers': [1, 2],
  'type': 'bus'
});

