import { useEffect, useState } from 'react';

/**
 * This method works for storing and fetching stuff from
 * local storage.
 * @param {object} key key to be looked for in the local storage
 * @param {object} value initial value
 * @returns {Array} [data, setData] from with data containing initial value at first time
 * and from next time value stored in local storage */

export const useLocalStorage = (key, initial) => {
  const [data, setData] = useState(() => {
    if (window) {
      const saved = window.localStorage.getItem(key);
      if (saved !== null && saved.length > 0) return JSON.parse(saved);
    }
    return initial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};
