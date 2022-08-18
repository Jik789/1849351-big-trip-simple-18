import { getRandomNumberOfRange, getRandomValue } from '../utils.js';
import {basePriceMock, dateFromMock, dateToMock, typeMock} from './const-mock';

export const waypointMock = () => ({
  'basePrice': getRandomValue(basePriceMock),
  'dateFrom': getRandomValue(dateFromMock),
  'dateTo': getRandomValue(dateToMock),
  'destination': getRandomNumberOfRange(1, 3),
  'id': getRandomNumberOfRange(1, 4),
  'offers': Array.from(new Set([getRandomNumberOfRange(1, 4), getRandomNumberOfRange(1, 4), getRandomNumberOfRange(1, 4), getRandomNumberOfRange(1, 4)])),
  'type': getRandomValue(typeMock),
});