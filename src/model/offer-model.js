import {offerTask} from '../mock/offer-task';

export default class OfferModel {
  tasks = Array.from({length: 3}, offerTask);
  getTasks = () => this.tasks;
}
