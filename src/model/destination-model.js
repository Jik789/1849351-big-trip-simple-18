import {destinationMock} from '../mock/destination-mock';

export default class DestinationModel {
  tasks = destinationMock();
  get = () => this.tasks;
}
