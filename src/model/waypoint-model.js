import {waypointTask} from '../mock/waypoint-task.js';

export default class WaypointModel {
  tasks = Array.from({length: 3}, waypointTask);
  getTasks = () => this.tasks;
}
