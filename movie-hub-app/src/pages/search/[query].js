import MovieCardList from "@/components/movieCard/movieCardList";
import { formatUrl } from "@/utils/formatters";
import { useRouter } from "next/router";
import config from "@/data/configurations.json";
import constants from "@/data/constants.json";

const Search = () => {
  const router = useRouter();
  const { query } = router.query;

  return (
    <MovieCardList
      type={"movie"}
      url={formatUrl(config.searchUrl, { query })}
      queryKey={constants.QUERY_KEYS.SEARCH}
    />
  );
};

export default Search;
