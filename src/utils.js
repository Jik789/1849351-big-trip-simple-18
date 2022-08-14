import dayjs from 'dayjs';

const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM');
// const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

export {humanizeDate};
