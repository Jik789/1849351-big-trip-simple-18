import { offerTask } from './offer-task';
import { destinationTask } from './destination-task';

export const waypointTask = () => ({
  'basePrice': 1100,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': destinationTask(),
  'id': '0',
  // 'offers': $Array < Offer.id >$,
  'type': 'bus'
});

