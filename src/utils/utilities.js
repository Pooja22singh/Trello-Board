import { TrelloConstants } from "../constants/trelloConstants";
import { data } from "../data/dummyData";

const simulateCall = () => new Promise((resolve) => setTimeout(resolve, 100));

/**
 *
 * @returns
 */
export const fetchData = async () => {
  await simulateCall();
  return data;
};

/**
 *
 * @param {*} list list of items
 * @param {*} order straight or reverse
 */
export const sortListOntime = (list, order) => {
  const sortedList = [...list];
  if (order === TrelloConstants.SORT_BY_CREATION_TIME) {
    sortedList.map((list) => {
      list.cards = list.cards.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });
  } else {
    sortedList.map((list) => {
      list.cards = list.cards.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  }
  return sortedList;
};
const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};

export const getDateTimeString = (date) =>
  `${new Date(date).toDateString()} ${formatAMPM(new Date(date))}`;
