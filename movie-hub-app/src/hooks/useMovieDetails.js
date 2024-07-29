import { useEffect, useState } from "react";
import config from "@/data/configurations.json";
import { formatUrl } from "@/utils/formatters";
import useFetch from "./useFetch";

const useMovieDetails = (type, id) => {
  const [details, setDetails] = useState();
  const fetchData = useFetch(formatUrl(config.detailsUrl, { type, id }));

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
