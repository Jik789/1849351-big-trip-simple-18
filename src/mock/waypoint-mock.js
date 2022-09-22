import { getRandomNumberOfRange, getRandomValue } from '../utils/utils.js';
import { BASE_PRICE_MOCK, DATE_FROM_MOCK, DATE_TO_MOCK } from './const-mock';
import { WAYPOINT_TYPE } from '../const';

export const waypointMock = (keyId) => ({
  'basePrice': getRandomValue(BASE_PRICE_MOCK),
  'dateFrom': getRandomValue(DATE_FROM_MOCK),
  'dateTo': getRandomValue(DATE_TO_MOCK),
  'destination': keyId,
  'id': keyId,
  'offers': Array.from(new Set([getRandomNumberOfRange(1, 4), getRandomNumberOfRange(1, 4), getRandomNumberOfRange(1, 4), getRandomNumberOfRange(1, 4)])),
  'type': getRandomValue(WAYPOINT_TYPE),
});
