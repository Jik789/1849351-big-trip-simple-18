import dayjs from 'dayjs';

const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM');
const getRandomNumber = (min,max) => Math.floor(Math.random() * ((max + 1) - min) + min);

export {humanizeDate, getRandomNumber};
