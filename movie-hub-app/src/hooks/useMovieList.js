import { useInfiniteQuery } from "@tanstack/react-query";
import { formatUrl } from "@/utils/formatters";
import useApi from "./useApi";

const useMovieList = (type, url, queryKey) => {
  const { fetchData } = useApi();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    initialPageParam: 1,
    gcTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 10,
    queryFn: ({ pageParam }) =>
      fetchData(formatUrl(url, { type, page: pageParam })),
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  return {
    movies: data?.pages?.flatMap((x) => x.results) ?? [],
    total: data?.pages?.[0]?.total_results ?? 0,
    fetchNextPage,
  };
};

export default useMovieList;
