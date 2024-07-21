import { useEffect, useState } from "react";
import config from "@/data/configurations.json";
import useFetch from "./useFetch";

const getUrl = (type, id) => {
  if (type && id) {
    return config.details
      .find((obj) => obj.type === type)
      .url.replace(/{([^}]*)}/g, id);
  }

  return "";
};

const useMovieDetails = (type, id) => {
  const [details, setDetails] = useState();
  const fetchData = useFetch(getUrl(type, id));

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchData();
      setDetails(data);
    };

    if (type && id) {
      fetchDetails();
    }
  }, [type, id]);

  return details;
};

export default useMovieDetails;
