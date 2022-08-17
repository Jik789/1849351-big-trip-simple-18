import { getRandomNumberOfRange, getRandomValue } from '../utils.js';
import {basePriceMock, dateFromMock, dateToMock, typeMock} from './const-mock';
import { offerMock } from './offer-mock';

export const waypointMock = () => ({
  'basePrice': getRandomValue(basePriceMock),
  'dateFrom': getRandomValue(dateFromMock),
  'dateTo': getRandomValue(dateToMock),
  'destination': getRandomNumberOfRange(1, 3), // НАДО СВЯЗАТЬ ЭТО
  'id': getRandomNumberOfRange(1, 4),
  'offers': [getRandomNumberOfRange(1,2), getRandomNumberOfRange(3,4)], // НАДО СВЯЗАТЬ ЭТО
  'type': getRandomValue(typeMock),
});

const generateWaypoint = () => {
  const waypoints = Array.from({length: 3}, waypointMock);

  let totalWaypointCount = 0;

  return waypoints.map((waypoint, index) => {
    console.log(waypoint)
    return '123'
  })
};

generateWaypoint()
