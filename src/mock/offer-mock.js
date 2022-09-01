import { getRandomNumberOfRange } from '../utils/utils.js';

export const offerMock = () => ([
  {
    'type': 'taxi',
    'offers': [{id: 1, title: 'taxi: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'taxi: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'taxi: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'taxi: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'taxi: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'taxi: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
  {
    'type': 'bus',
    'offers': [{id: 1, title: 'bus: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'bus: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'bus: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'bus: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'bus: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'bus: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
  {
    'type': 'train',
    'offers': [{id: 1, title: 'train: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'train: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'train: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'train: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'train: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'train: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
  {
    'type': 'ship',
    'offers': [{id: 1, title: 'ship: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'ship: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'ship: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'ship: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'ship: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'ship: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
  {
    'type': 'drive',
    'offers': [{id: 1, title: 'drive: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'drive: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'drive: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'drive: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'drive: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'drive: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
  {
    'type': 'flight',
    'offers': [{id: 1, title: 'flight: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'flight: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'flight: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'flight: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'flight: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'flight: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
  {
    'type': 'check-in',
    'offers': [{id: 1, title: 'check-in: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'check-in: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'check-in: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'check-in: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'check-in: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'check-in: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
  {
    'type': 'sightseeing',
    'offers': [{id: 1, title: 'sightseeing: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'sightseeing: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'sightseeing: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'sightseeing: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'sightseeing: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'sightseeing: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
  {
    'type': 'restaurant',
    'offers': [{id: 1, title: 'restaurant: Завтрак', price: getRandomNumberOfRange(100, 500)},
      {id: 2, title: 'restaurant: Обед', price: getRandomNumberOfRange(100, 500)},
      {id: 3, title: 'restaurant: Ужин', price: getRandomNumberOfRange(100, 500)},
      {id: 4, title: 'restaurant: Полотенце', price: getRandomNumberOfRange(100, 500)},
      {id: 5, title: 'restaurant: Красивую спутницу', price: getRandomNumberOfRange(100, 500)},
      {id: 6, title: 'restaurant: Чистая обувь', price: getRandomNumberOfRange(100, 500)}]
  },
]);
