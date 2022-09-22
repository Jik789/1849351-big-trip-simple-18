import { FilterType } from '../const';
import { isFutureDate } from './utils';

const filter = {
  [FilterType.EVERYTHING]: (wayPoints) => wayPoints,
  [FilterType.FUTURE]: (wayPoints) => wayPoints.filter((wayPoint) => isFutureDate(wayPoint.dateTo, wayPoint.dateFrom)),
};

export { filter };

