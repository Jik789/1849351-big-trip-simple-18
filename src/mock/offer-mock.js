import { getRandomNumberOfRange, getRandomValue } from '../utils.js';
import { typeMock } from './const-mock';

export const offerMock = (keyId) => ({
  'id': keyId,
  'title': getRandomValue(typeMock),
  'price': getRandomNumberOfRange(123, 320)
});
