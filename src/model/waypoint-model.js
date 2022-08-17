import {waypointMock} from '../mock/waypoint-mock';

export default class WaypointModel {
  tasks = Array.from({length: 3}, waypointMock);
  get = () => this.tasks;
}
