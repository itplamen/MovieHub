import { useEffect, useState } from "react";
import { formatUrl } from "@/utils/formatters";
import useFetch from "./useFetch";

const useMovieList = (url, type) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const fetchData = useFetch(formatUrl(url, { type, page }));

  useEffect(() => {
    const fetchMovieList = async () => {
      const data = await fetchData();

      if (page > 1) {
        setMovies((prevData) => {
          return [...prevData, ...data.results];
        });
      } else {
        setMovies(data.results);
      }
    };

    fetchMovieList();
  }, [url, page]);

  const loadMore = () => {
    // TODO: page withing range
    setPage((prev) => prev + 1);
  };

  return { movies, loadMore };
};

export default useMovieList;
