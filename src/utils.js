import dayjs from 'dayjs';

const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM');
const humanizeTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const robotDate = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');
const robotDateTime = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');

const getRandomNumber = (min,max) => Math.floor(Math.random() * ((max + 1) - min) + min);

export {humanizeDate, getRandomNumber, humanizeTime, robotDate, robotDateTime};
