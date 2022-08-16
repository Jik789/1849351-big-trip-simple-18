import {waypointMock} from '../mock/waypoint-mock';

export default class WaypointModel {
  tasks = Array.from({length: 3}, waypointMock);
  getTasks = () => this.tasks;
}
