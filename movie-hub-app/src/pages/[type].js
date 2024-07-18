import { useRouter } from "next/router";
import config from "@/data/configurations.json";
import MovieCardList from "@/components/movieCard/movieCardList";

const Trending = () => {
  const router = useRouter();
  const { type } = router.query;
  const trending = config.trendings.find((obj) => obj.type === type);

  return <>{trending && <MovieCardList {...trending} />}</>;
};

export default Trending;
