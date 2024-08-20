import { useReducer } from "react";
import constants from "@/data/constants.json";
import config from "@/data/configurations.json";
import MovieCardList from "@/components/movieCard/movieCardList";
import Filter from "@/components/filter/filter";
import { formatDiscoverUrl } from "@/utils/formatters";
import filterReducer from "@/reducers/filter/filterReducer";

const Discover = () => {
  const [state, dispatch] = useReducer(filterReducer, {
    movieType: constants.MOVIE_TYPES[0].type,
    genreId: null,
    year: null,
    sortBy: constants.SORT_BY_OPTIONS[0].value,
  });

  const url = formatDiscoverUrl(config.discoverUrl, {
    genreId: state.genreId,
    year: state.year,
    sortBy: state.sortBy,
  });

  return (
    <>
      <Filter
        movieType={state.movieType}
        genreId={state.genreId}
        year={state.year}
        sortBy={state.sortBy}
        handleSearch={dispatch}
      />
      <MovieCardList
        type={state.movieType}
        url={url}
        queryKey={[constants.QUERY_KEYS.DISCOVER, ...Object.values(state)]}
      />
    </>
  );
};

export default Discover;
