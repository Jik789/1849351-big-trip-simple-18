import dayjs from 'dayjs';

const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM');
const humanizeTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeDateTime = (dueDate) => dayjs(dueDate).format('DD/MM/01 HH:mm');
const robotDate = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');
const robotDateTime = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');


const getRandomNumberOfRange = (min,max) => Math.floor(Math.random() * ((max + 1) - min) + min);
const getRandomValue = (items) => items[getRandomNumberOfRange(0, items.length - 1)];

export {humanizeDate, getRandomNumberOfRange, getRandomValue , humanizeTime, robotDate, robotDateTime, humanizeDateTime};
