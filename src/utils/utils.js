import dayjs from 'dayjs';
import { UNIT_DATE } from '../const';

const humanizeDate = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('D MMMM');
const humanizeTime = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('HH:mm');
const humanizeDateTime = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('DD/MM/01 HH:mm');
const robotDate = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('YYYY-MM-DD');
const robotDateTime = (dueDate) => dueDate === null ? '' : dayjs(dueDate).format('YYYY-MM-DDTHH:mm');

const toUpperCaseFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const sortWaypointDay = (taskA, taskB) => dayjs(taskA.dateFrom).diff(dayjs(taskB.dateFrom));

const sortWaypointPrice = (taskA, taskB) => taskB.basePrice - taskA.basePrice;

const getDestination = (idDestination, allDestinations) => allDestinations.find((destinationItem) => destinationItem.id === idDestination);

const getOffersByType = (typeOffer, allOffers) => allOffers.find((offer) => offer.type === typeOffer).offers;

const isFutureDate = (dateStart, dateEnd) => dayjs().isBefore(dayjs(dateStart), UNIT_DATE) || dayjs().isBefore(dayjs(dateEnd), UNIT_DATE);

export {humanizeDate, humanizeTime, robotDate, robotDateTime, humanizeDateTime, sortWaypointDay, sortWaypointPrice, toUpperCaseFirstLetter, getDestination, getOffersByType, isDatesEqual, isFutureDate};


