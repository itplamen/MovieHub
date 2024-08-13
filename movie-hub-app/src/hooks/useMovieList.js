import { useEffect, useState } from "react";
import { formatUrl } from "@/utils/formatters";
import useApi from "./useApi";

const INITIAL_PAGE = 1;

const useMovieList = (url, type) => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [movies, setMovies] = useState([]);
  const { fetchData } = useApi();

  useEffect(() => {
    const fetchMovieList = async () => {
      const data = await fetchData(formatUrl(url, { type, page }));

      if (page > INITIAL_PAGE) {
        setMovies((prevData) => {
          return [...prevData, ...data.results];
        });
      } else {
        setMovies(data.results);
      }
    };

    fetchMovieList();
  }, [url, type, page]);

  const loadMore = () => {
    // TODO: page withing range
    setPage((prev) => prev + 1);
  };

  return { movies, loadMore };
};

export default useMovieList;
