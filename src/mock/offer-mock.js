import { getRandomNumberOfRange, getRandomValue } from '../utils/utils.js';
import { TYPE_MOCK } from './const-mock';

export const offerMock = (keyId) => ({
  'id': keyId,
  'title': getRandomValue(TYPE_MOCK),
  'price': getRandomNumberOfRange(123, 320)
});

export const offerByTypeMock = () => ([
  {
    'type': 'taxi',
    'offers': ['Покушать в такси', 'Поспать в такси', 'Сходить в туалет в такси']
  },
  {
    'type': 'bus',
    'offers': ['Покушать в автобусе', 'Поспать в автобусе', 'Сходить в туалет в автобусе']
  },
  {
    'type': 'train',
    'offers': ['Покушать в поезде', 'Поспать в поезде', 'Сходить в туалет в поезде']
  },
  {
    'type': 'ship',
    'offers': ['Покушать на корабле', 'Поспать на корабле', 'Сходить в туалет на корабле']
  },
  {
    'type': 'drive',
    'offers': ['Покушать в поездке', 'Поспать в поездке', 'Сходить в туалет в поездке']
  },
  {
    'type': 'flight',
    'offers': ['Покушать в полете', 'Поспать в полете', 'Сходить в туалет в полете']
  },
  {
    'type': 'check-in',
    'offers': ['Покушать при чек-ине', 'Поспать при чек-ине', 'Сходить в туалет при чек-ине']
  },
  {
    'type': 'sightseeing',
    'offers': ['Покушать при осмотре', 'Поспать при осмотре', 'Сходить в туалет при осмотре']
  },
  {
    'type': 'restaurant',
    'offers': ['Покушать в ресторане', 'Поспать в ресторане', 'Сходить в туалет в ресторане']
  },
]);
