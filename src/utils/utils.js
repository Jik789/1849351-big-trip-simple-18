import dayjs from 'dayjs';

const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM');
const humanizeTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeDateTime = (dueDate) => dayjs(dueDate).format('DD/MM/01 HH:mm');
const robotDate = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');
const robotDateTime = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');


const getRandomNumberOfRange = (min,max) => Math.floor(Math.random() * ((max + 1) - min) + min);
const getRandomValue = (items) => items[getRandomNumberOfRange(0, items.length - 1)];

const toUpperCaseFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

const isWaypontRepeating = (repeating) => Object.values(repeating).some(Boolean);

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

const sortWaypointDay = (taskA, taskB) => dayjs(taskA.dateFrom).diff(dayjs(taskB.dateFrom));

const sortWaypointPrice = (taskA, taskB) => taskB.basePrice - taskA.basePrice;

export {humanizeDate, getRandomNumberOfRange, getRandomValue , humanizeTime, robotDate, robotDateTime, humanizeDateTime, updateItem, sortWaypointDay, sortWaypointPrice, toUpperCaseFirstLetter, isWaypontRepeating};
