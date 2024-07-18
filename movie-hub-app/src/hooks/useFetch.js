import { useEffect, useState } from "react";
import config from "@/data/configurations.json";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  const fetchData = async (dataUrl, pageNumber) => {
    const fullUrl = `${config.apiBaseUrl}/${dataUrl}${
      pageNumber ? `?page=${pageNumber}` : ""
    }`;
    const response = await fetch(fullUrl, {
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

  const refetch = (url, page) => {
    fetchData(url, page);
  };

  return { data, refetch };
};

export default useFetch;
