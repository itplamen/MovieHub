import { useQuery } from "@tanstack/react-query";
import config from "@/data/configurations.json";
import constants from "@/data/constants.json";
import { formatUrl } from "@/utils/formatters";
import useApi from "./useApi";

const useMovieDetails = (type, id) => {
  const { fetchData } = useApi();
  const url = formatUrl(config.detailsUrl, { type, id });
  const { data } = useQuery({
    queryKey: [constants.QUERY_KEYS.MOVIE_DETAILS, type, id],
    queryFn: () => fetchData(url),
    enabled: id >= 0 && constants.MOVIE_TYPES.some((x) => x.type === type),
    refetchOnWindowFocus: false,
  });

  return data;
};

export default useMovieDetails;
