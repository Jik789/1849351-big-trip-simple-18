import {waypointMock} from '../mock/waypoint-mock..js';

export default class WaypointModel {
  tasks = Array.from({length: 3}, waypointMock);
  getTasks = () => this.tasks;
}
