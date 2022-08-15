import {destinationMock} from '../mock/destination-mock';

export default class DestinationModel {
  tasks = Array.from({length: 3}, destinationMock);
  getTasks = () => this.tasks;
}
