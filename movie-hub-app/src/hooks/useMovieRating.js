import { useEffect, useReducer } from "react";
import config from "@/data/configurations.json";
import constants from "@/data/constants.json";
import useApi from "./useApi";
import useLocalStorage from "./useLocalStorage";
import { formatUrl } from "@/utils/formatters";

const ACTIONS = {
  SET_INITIAL_DATA: "set_initial_data",
  ADD_MOVIE_RATING: "add_movie_rating",
  ADD_NEW_SESSION: "add_new_session",
  SET_READY_TO_RATE: "set_ready_to_rate",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_INITIAL_DATA:
      return { ...action.payload };
    case ACTIONS.ADD_MOVIE_RATING:
      return {
        sessions: [...state.sessions],
        movies: [...state.movies, action.payload.movie],
        getNewSession: action.payload.getNewSession,
        readyToRate: action.payload.readyToRate,
      };
    case ACTIONS.ADD_NEW_SESSION:
      return {
        ...state,
        readyToRate: action.payload.readyToRate,
        sessions: [...action.payload.sessions],
      };
    case ACTIONS.SET_READY_TO_RATE:
      return {
        ...state,
        readyToRate: action.payload.readyToRate,
      };
    default:
      throw new Error("Unexpected action type");
  }
};

const isSessionExpired = (sessions) => {
  if (sessions && sessions.length > 0) {
    const now = new Date();
    let utcNow = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    const expDate = new Date(sessions.find((x) => !x.isExpired).expDate);
    const expDateUtc = Date.UTC(
      expDate.getUTCFullYear(),
      expDate.getUTCMonth(),
      expDate.getUTCDate(),
      expDate.getUTCHours(),
      expDate.getUTCMinutes(),
      expDate.getUTCSeconds()
    );

    return expDateUtc <= utcNow;
  }

  return true;
};

const useMovieRating = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const { fetchData, postData } = useApi();
  const { data, saveData } = useLocalStorage(constants.STORAGE_KEYS.RATING);

  useEffect(() => {
    if (data && !state.sessions && !state.movies) {
      dispatch({
        type: ACTIONS.SET_INITIAL_DATA,
        payload: {
          sessions: data.sessions ?? [],
          movies: data.movies ?? [],
          getNewSession: false,
          readyToRate: false,
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (state.getNewSession) {
      const fetchSession = async () => {
        const result = await fetchData(config.guestSessionUrl);
        dispatch({
          type: ACTIONS.ADD_NEW_SESSION,
          payload: {
            readyToRate: true,
            sessions: [
              ...state.sessions.map((x) => ({
                ...x,
                isExpired: true,
              })),
              {
                isExpired: false,
                key: result.guest_session_id,
                expDate: result.expires_at,
              },
            ],
          },
        });
      };

      fetchSession();
    }
  }, [state.getNewSession]);

  useEffect(() => {
    if (state.readyToRate) {
      saveData({
        key: -1,
        sessions: [...state.sessions],
        movies: [...state.movies],
      });

      const movieToRate = state.movies.at(-1);
      const url = formatUrl(config.addRatingUrl, {
        type: movieToRate.type,
        id: movieToRate.id,
        sessionId: state.sessions.find((x) => !x.isExpired).key,
      });
      const rateMovie = async () => {
        const result = await postData(url, { value: movieToRate.rating });
      };

      rateMovie();

      dispatch({
        type: ACTIONS.SET_READY_TO_RATE,
        payload: {
          readyToRate: false,
        },
      });
    }
  }, [state.readyToRate]);

  const rate = (movie) => {
    if (
      movie.rating < constants.RATING.MIN ||
      movie.rating > constants.RATING.MAX
    ) {
      throw new Error(
        `Rating '${movie.rating}' is outside of the range [${constants.RATING.MIN} - ${constants.RATING.MAX}]`
      );
    }

    const isExpired = isSessionExpired(state.sessions);
    dispatch({
      type: ACTIONS.ADD_MOVIE_RATING,
      payload: {
        movie: movie,
        getNewSession: isExpired,
        readyToRate: !isExpired,
      },
    });
  };

  return rate;
};

export default useMovieRating;
