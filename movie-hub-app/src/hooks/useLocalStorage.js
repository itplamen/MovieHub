import { useEffect, useState } from "react";

const getData = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    console.log(error);
  }
};

const useLocalStorage = (key) => {
  const [data, setData] = useState(() => {
    return getData(key);
  });

  const save = (value) => {
    setData((prev) => {
      return !prev.find((x) => x === value) ? [...prev, value] : prev;
    });
  };

  const remove = (value) => {
    setData((prev) => {
      return [...prev.filter((item) => item !== value)];
    });
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return { data, save, remove };
};

export default useLocalStorage;
