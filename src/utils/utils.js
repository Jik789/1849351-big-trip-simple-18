import dayjs from 'dayjs';

const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM');
const humanizeTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeDateTime = (dueDate) => dayjs(dueDate).format('DD/MM/01 HH:mm');
const robotDate = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');
const robotDateTime = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');


const getRandomNumberOfRange = (min,max) => Math.floor(Math.random() * ((max + 1) - min) + min);
const getRandomValue = (items) => items[getRandomNumberOfRange(0, items.length - 1)];

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortTaskDown = (taskA, taskB) => {
  return;
};

const sortWaypointPrice = (taskA, taskB) => taskA.basePrice - taskB.basePrice;


export {humanizeDate, getRandomNumberOfRange, getRandomValue , humanizeTime, robotDate, robotDateTime, humanizeDateTime, updateItem, sortTaskDown, sortWaypointPrice};
