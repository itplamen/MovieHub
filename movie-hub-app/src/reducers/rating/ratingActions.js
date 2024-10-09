export const ACTIONS = {
  SET_INITIAL_DATA: "set_initial_data",
  ADD_MOVIE_RATING: "add_movie_rating",
  GET_NEW_SESSION: "get_new_session",
  SAVE_NEW_SESSION: "save_new_session",
};

export const setInitialData = (session, movies) => {
  return {
    type: ACTIONS.SET_INITIAL_DATA,
    payload: {
      session: session ?? {},
      movies: movies ?? [],
    },
  };
};

export const addMovieRating = (movie) => {
  return {
    type: ACTIONS.ADD_MOVIE_RATING,
    payload: {
      movie: movie,
    },
  };
};

export const getNewSession = (isExpired) => {
  return {
    type: ACTIONS.GET_NEW_SESSION,
    payload: {
      session: {
        isExpired,
      },
    },
  };
};

export const saveNewSession = (id, expDate) => {
  return {
    type: ACTIONS.SAVE_NEW_SESSION,
    payload: {
      session: {
        id,
        expDate,
        isExpired: false,
      },
    },
  };
};
