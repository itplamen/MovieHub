import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [data, setData] = useState();

  const getData = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const saveData = (item) => {
    if (!item) {
      return;
    }

    // TODO: add validations for key prop
    if (!item.hasOwnProperty("key")) {
      item.key = -1;
    }

    setData((prev) => {
      return item.key === -1 || prev.find((x) => x.key === item.key)
        ? item
        : [...prev, item];
    });
  };

  const removeData = (item) => {
    setData((prev) => {
      return [...prev.filter((x) => x.key !== item.key)];
    });
  };

  useEffect(() => {
    const initialData = getData(key);
    setData(initialData);
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return { data, saveData, removeData };
};

export default useLocalStorage;
