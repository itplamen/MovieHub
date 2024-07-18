import { useEffect, useState } from "react";
import config from "@/data/configurations.json";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  const fetchData = async (dataUrl) => {
    const response = await fetch(`${config.apiBaseUrl}/${dataUrl}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
    });

    const json = await response.json();
    setData((prevData) => {
      return [...prevData, ...json.results];
    });
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const refetch = (url) => {
    fetchData(url);
  };

  return { data, refetch };
};

export default useFetch;
