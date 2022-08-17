import {offerMock} from '../mock/offer-mock';

export default class OfferModel {
  tasks = offerMock();
  get = () => this.tasks;
}
