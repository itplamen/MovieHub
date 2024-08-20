import { useRouter } from "next/router";
import config from "@/data/configurations.json";
import constants from "@/data/constants.json";
import MovieCardList from "@/components/movieCard/movieCardList";
import { formatDiscoverUrl } from "@/utils/formatters";
import { useEffect, useState } from "react";

const Genre = () => {
  const [url, setUrl] = useState();
  const router = useRouter();
  const { type } = router.query;
  const genres = constants.GENRES[constants.MOVIE_TYPES[0].type];

  useEffect(() => {
    if (router.isReady && genres.length > 0) {
      const genre = genres.find(
        (x) => x.name.toLowerCase() === type.toLowerCase()
      );
      setUrl(formatDiscoverUrl(config.discoverUrl, { genreId: genre.id }));
    }
  }, [router.isReady, genres.length > 0]);

  return (
    <>
      {url && (
        <MovieCardList
          type={constants.MOVIE_TYPES[0].type}
          url={url}
          queryKey={constants.QUERY_KEYS.MOVIES_BY_GENRE}
        />
      )}
    </>
  );
};

export default Genre;
