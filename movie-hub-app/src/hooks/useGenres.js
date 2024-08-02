import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import config from "@/data/configurations.json";
import { formatUrl } from "@/utils/formatters";

const useGenres = (type) => {
  const [genres, setGenres] = useState([]);
  const fetchData = useFetch(formatUrl(config.genresUrl, { type }));

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await fetchData();
      setGenres(data.genres);
    };

    if (type) {
      fetchGenres();
    }
  }, [type]);

  return genres;
};

export default useGenres;
