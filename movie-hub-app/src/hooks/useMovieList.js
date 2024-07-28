import { useEffect, useState } from "react";
import config from "@/data/configurations.json";
import useFetch from "./useFetch";

const getUrl = (type) => {
  if (type) {
    return config.trendingsUrl.replace(/{([^}]*)}/g, type);
  }

  return "";
};

const useMovieList = (type) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const fetchData = useFetch(`${getUrl(type)}?page=${page}`);

  useEffect(() => {
    const fetchMovieList = async () => {
      const data = await fetchData();
      setMovies((prevData) => {
        return [...prevData, ...data.results];
      });
    };

    fetchMovieList();
  }, [page]);

  const loadMore = () => {
    // TODO: page withing range
    setPage((prev) => prev + 1);
  };

  return { movies, loadMore };
};

export default useMovieList;
