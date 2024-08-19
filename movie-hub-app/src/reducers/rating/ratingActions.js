export const ACTIONS = {
  SET_INITIAL_DATA: "set_initial_data",
  ADD_MOVIE_RATING: "add_movie_rating",
  ADD_NEW_SESSION: "add_new_session",
  SET_READY_TO_RATE: "set_ready_to_rate",
};

export const setInitialData = (sessions, movies) => {
  return {
    type: ACTIONS.SET_INITIAL_DATA,
    payload: {
      sessions: sessions ?? [],
      movies: movies ?? [],
      getNewSession: false,
      readyToRate: false,
    },
  };
};

export const addMovieRating = (movie, isExpired) => {
  return {
    type: ACTIONS.ADD_MOVIE_RATING,
    payload: {
      movie: movie,
      getNewSession: isExpired,
      readyToRate: !isExpired,
    },
  };
};

export const addNewSession = (sessions, sessionId, expDate) => {
  return {
    type: ACTIONS.ADD_NEW_SESSION,
    payload: {
      readyToRate: true,
      sessions: [
        ...sessions.map((x) => ({
          ...x,
          isExpired: true,
        })),
        {
          isExpired: false,
          key: sessionId,
          expDate: expDate,
        },
      ],
    },
  };
};

export const setReadyToRate = (readyToRate) => {
  return {
    type: ACTIONS.SET_READY_TO_RATE,
    payload: {
      readyToRate: readyToRate,
    },
  };
};
