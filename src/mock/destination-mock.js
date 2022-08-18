import { getRandomNumberOfRange, getRandomValue } from '../utils.js';

export const destinationMock = (keyId) => ({
  'id': keyId,
  'description': 'Chamonix, is a beautiful city',
  'name': 'Chamonix',
  'pictures': [
    {
      'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.'
    }
  ]
});
