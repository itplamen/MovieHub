import { useEffect, useState } from "react";
import config from "@/data/configurations.json";
import { formatUrl } from "@/utils/formatters";
import useApi from "./useApi";

const useMovieDetails = (type, id) => {
  const [details, setDetails] = useState();
  const { fetchData } = useApi();

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchData(formatUrl(config.detailsUrl, { type, id }));
      setDetails(data);
    };

    if (type && id) {
      fetchDetails();
    }
  }, [type, id]);

  return details;
};

export default useMovieDetails;
