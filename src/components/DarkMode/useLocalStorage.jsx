import React, { useEffect, useState } from "react";
import { MdStoreMallDirectory } from "react-icons/md";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
      currentValue = localStorage.getItem(key);
      if (currentValue !== null) {
        return JSON.parse(currentValue);
      } else {
        return defaultValue;
      }
    } catch (e) {
      console.error(e);
      return defaultValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
