import { getRandomNumberOfRange, getRandomValue } from '../utils.js';
import { TYPE_MOCK } from './const-mock';

export const offerMock = (keyId) => ({
  'id': keyId,
  'title': getRandomValue(TYPE_MOCK),
  'price': getRandomNumberOfRange(123, 320)
});

export const offerByTypeMock = () => ([
  {
    'type': 'taxi',
    'offers': ['Покушать в такси', 'Поспать', 'Сходить в туалет']
  },
  {
    'type': 'bus',
    'offers': ['Покушать в автобусе', 'Поспать', 'Сходить в туалет']
  },
  {
    'type': 'train',
    'offers': ['Покушать в поезде', 'Поспать', 'Сходить в туалет']
  },
  {
    'type': 'ship',
    'offers': ['Покушать на корабле', 'Поспать', 'Сходить в туалет']
  },
  {
    'type': 'drive',
    'offers': ['Покушать в поездке', 'Поспать', 'Сходить в туалет']
  },
  {
    'type': 'flight',
    'offers': ['Покушать в полете', 'Поспать', 'Сходить в туалет']
  },
  {
    'type': 'check-in',
    'offers': ['Покушать при чек-ине', 'Поспать', 'Сходить в туалет']
  },
  {
    'type': 'sightseeing',
    'offers': ['Покушать при осмотре', 'Поспать', 'Сходить в туалет']
  },
  {
    'type': 'restaurant',
    'offers': ['Покушать в ресторане', 'Поспать', 'Сходить в туалет']
  },
]);
