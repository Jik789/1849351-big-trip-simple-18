import { getRandomValue } from '../utils.js';
import { NAME_MOCK } from './const-mock';

export const destinationMock = (keyId) => ({
  'id': keyId,
  'description': `Вот по такому id:${keyId} идёт связь в это описание. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  'name': getRandomValue(NAME_MOCK),
  'pictures': [
    {
      'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.'
    }
  ]
});
