import { FilterType } from '../const';

const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks,
  [FilterType.FUTURE]: (tasks) => tasks,
};

export { filter };

