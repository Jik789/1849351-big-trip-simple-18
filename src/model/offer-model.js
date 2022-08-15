import {offerMock} from '../mock/offer-mock';

export default class OfferModel {
  tasks = Array.from({length: 3}, offerMock);
  getTasks = () => this.tasks;
}
