import { getRandomNumber } from '../utils.js';

export const offerMock = () => ([
  {
    'id': 1,
    'title': 'One',
    'price': getRandomNumber(123, 320)
  },
  {
    'id': 2,
    'title': 'Two',
    'price': getRandomNumber(123, 320)
  },
  {
    'id': 3,
    'title': 'Three',
    'price': getRandomNumber(123, 320)
  },
  {
    'id': 4,
    'title': 'Four',
    'price': getRandomNumber(123, 320)
  },
]);
