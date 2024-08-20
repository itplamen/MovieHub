import MovieCardList from "@/components/movieCard/movieCardList";
import { formatUrl } from "@/utils/formatters";
import { useRouter } from "next/router";
import config from "@/data/configurations.json";

const Search = () => {
  const router = useRouter();
  const { query } = router.query;

  return (
    <MovieCardList
      type={"movie"}
      url={formatUrl(config.searchUrl, { query })}
    />
  );
};

export default Search;
