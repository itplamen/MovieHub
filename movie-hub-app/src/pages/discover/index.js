import { useState } from "react";
import constants from "@/data/constants.json";
import config from "@/data/configurations.json";
import MovieCardList from "@/components/movieCard/movieCardList";
import Filter from "@/components/filter/filter";
import { formatDiscoverUrl } from "@/utils/formatters";

const Discover = () => {
  const [url, setUrl] = useState();
  const [type, setType] = useState(constants.MOVIE_TYPES[0].type);

  const search = ({ movieType, genreId, year, sortBy }) => {
    const discoverUrl = formatDiscoverUrl(config.discoverUrl, {
      genreId,
      year,
      sortBy,
    });

    setUrl(discoverUrl);
    setType(movieType);
  };

  return (
    <>
      <Filter search={search} />
      {type && url && (
        <MovieCardList
          type={type}
          url={url}
          queryKey={constants.QUERY_KEYS.DISCOVER}
        />
      )}
    </>
  );
};

export default Discover;
