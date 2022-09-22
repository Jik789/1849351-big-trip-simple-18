import dayjs from 'dayjs';
import { UNIT_DATE } from '../mock/const-mock';

const humanizeDate = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('D MMMM');
const humanizeTime = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('HH:mm');
const humanizeDateTime = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('DD/MM/01 HH:mm');
const robotDate = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('YYYY-MM-DD');
const robotDateTime = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('YYYY-MM-DDTHH:mm');


const getRandomNumberOfRange = (min,max) => Math.floor(Math.random() * ((max + 1) - min) + min);
const getRandomValue = (items) => items[getRandomNumberOfRange(0, items.length - 1)];

const toUpperCaseFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

const getObjectIndexInArray = (arr) => {
  const arrIndex = [];

  for (let i = 0; i < arr.length; i++) {
    arrIndex.push(arr[i].id);
  }

  return arrIndex;
};

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

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const sortWaypointDay = (taskA, taskB) => dayjs(taskA.dateFrom).diff(dayjs(taskB.dateFrom));

const sortWaypointPrice = (taskA, taskB) => taskB.basePrice - taskA.basePrice;

const getDestination = (idDestination, allDestinations) => allDestinations.find((destinationItem) => destinationItem.id === idDestination);

const getOffersByType = (typeOffer, allOffers) => allOffers.find((offer) => offer.type === typeOffer).offers;

const isFutureDate = (dateStart, dateEnd) => dayjs().isBefore(dayjs(dateStart), UNIT_DATE) || dayjs().isBefore(dayjs(dateEnd), UNIT_DATE);

export {humanizeDate, getRandomNumberOfRange, getRandomValue , humanizeTime, robotDate, robotDateTime, humanizeDateTime, updateItem, sortWaypointDay, sortWaypointPrice, toUpperCaseFirstLetter, getObjectIndexInArray, getDestination, getOffersByType, isDatesEqual, isFutureDate};
