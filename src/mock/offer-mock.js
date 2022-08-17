import { getRandomNumberOfRange } from '../utils.js';

export const offerMock = () => ([
  {
    'id': 1,
    'title': 'One',
    'price': getRandomNumberOfRange(123, 320)
  },
  {
    'id': 2,
    'title': 'Two',
    'price': getRandomNumberOfRange(123, 320)
  },
  {
    'id': 3,
    'title': 'Three',
    'price': getRandomNumberOfRange(123, 320)
  },
  {
    'id': 4,
    'title': 'Four',
    'price': getRandomNumberOfRange(123, 320)
  },
]);
