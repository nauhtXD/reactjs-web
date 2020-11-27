/* eslint-disable no-unused-expressions */
/* eslint-disable no-unreachable */
import moment from 'moment';

const convertTime = value => {
  const time = new Date(value);
  return `${time.getHours()}:${time.getMinutes()} ${moment(time).format(
    'DD/MM/YYYY',
  )}`;
};

const findKeyByValue = (object, value) =>
  Object.keys(object).find(key => object[key] === value);

export { convertTime, findKeyByValue };
