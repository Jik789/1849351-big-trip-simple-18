import {destinationTask} from '../mock/destination-task';

export default class DestinationModel {
  tasks = Array.from({length: 3}, destinationTask);
  getTasks = () => this.tasks;
}
