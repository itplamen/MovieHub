import { useEffect, useState } from "react";
import useApi from "./useApi";
import config from "@/data/configurations.json";
import { formatUrl } from "@/utils/formatters";

const useGenres = (type) => {
  const [genres, setGenres] = useState([]);
  const { fetchData } = useApi();

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await fetchData(formatUrl(config.genresUrl, { type }));
      setGenres(data.genres);
    };

    if (type) {
      fetchGenres();
    }
  }, [type]);

  return genres;
};

export default useGenres;
