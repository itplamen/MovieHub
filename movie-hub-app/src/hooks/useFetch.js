import { useEffect, useState } from "react";
import config from "@/data/configurations.json";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.apiBaseUrl}/${url}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
      });

      const json = await response.json();
      setData(json.results);
    };

    fetchData();
  }, [url]);

  return data;
};

export default useFetch;
