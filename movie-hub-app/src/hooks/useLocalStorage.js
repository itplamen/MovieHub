import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [data, setData] = useState({ updated: "", items: [] });

  const getData = (key) => {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };

  const saveData = (item) => {
    if (item && item.hasOwnProperty("tag")) {
      setData((prev) => {
        return {
          updated: new Date().toGMTString(),
          items: [...prev.items.filter((x) => x.tag !== item.tag), item],
        };
      });
    } else {
      throw new Error("Could not save item");
    }
  };

  const removeData = (item) => {
    setData((prev) => {
      return {
        updated: new Date().toGMTString(),
        items: [...prev.items.filter((x) => x.tag !== item.tag)],
      };
    });
  };

  useEffect(() => {
    const initialData = getData(key);
    if (initialData) {
      setData(initialData);
    }
  }, [key]);

  useEffect(() => {
    if (data.updated) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data.updated]);

  return { data: data.items, saveData, removeData };
};

export default useLocalStorage;
