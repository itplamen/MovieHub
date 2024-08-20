import constants from "@/data/constants.json";

export const ACTIONS = {
  SET_MOVIE_TYPE: "set-movie-type",
  SET_GENRE: "set-genre",
  SET_YEAR: "set-year",
  SET_SORT_OPTION: "set-sort-option",
};

export const setMovieType = (type) => {
  if (constants.MOVIE_TYPES.some((x) => x.type === type)) {
    return {
      type: ACTIONS.SET_MOVIE_TYPE,
      payload: {
        movieType: type,
      },
    };
  }

  throw new Error(`Invalid filter movie type '${type}'`);
};

export const setGenre = (id) => {
  const isDefault = parseInt(id, 10) === constants.DEFAULT_FILTER_VALUE.id;
  const found =
    isDefault ||
    constants.MOVIE_TYPES.some((movieType) =>
      constants.GENRES[movieType.type].some((x) => x.id === parseInt(id, 10))
    );

  if (found) {
    return {
      type: ACTIONS.SET_GENRE,
      payload: {
        genreId: isDefault ? null : id,
      },
    };
  }

  throw new Error(`Invalid filter genre ID '${id}'`);
};

export const setYear = (year) => {
  const isDefault = year === constants.DEFAULT_FILTER_VALUE.name;
  if (
    isDefault ||
    (year >= constants.FILTER_MOVIE_YEAR_MIN &&
      year <= new Date().getFullYear())
  ) {
    return {
      type: ACTIONS.SET_YEAR,
      payload: {
        year: isDefault ? null : year,
      },
    };
  }

  throw new Error(`Invalid filter year '${year}'`);
};

export const setSortOption = (option) => {
  if (constants.SORT_BY_OPTIONS.some((x) => x.value === option)) {
    return {
      type: ACTIONS.SET_SORT_OPTION,
      payload: {
        sortBy: option,
      },
    };
  }

  throw new Error(`Invalid filter sort by option '${option}'`);
};
