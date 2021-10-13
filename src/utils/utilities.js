import { data } from "../data/dummyData";

const simulateCall = () => {
  return new Promise((resolve) => setTimeout(resolve, 100));
};

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
 * @param {*} list 
 * @param {*} order straight or reverse
 */
export const sortListOntime = (list, order) => {
   
}


