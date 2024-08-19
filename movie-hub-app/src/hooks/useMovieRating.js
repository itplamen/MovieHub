import { useEffect, useReducer } from "react";
import config from "@/data/configurations.json";
import constants from "@/data/constants.json";
import useApi from "./useApi";
import useLocalStorage from "./useLocalStorage";
import { formatUrl } from "@/utils/formatters";
import {
  setInitialData,
  addMovieRating,
  addNewSession,
  setReadyToRate,
} from "@/reducers/rating/ratingActions";
import ratingReducer from "@/reducers/rating/ratingReducer";

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
  const [state, dispatch] = useReducer(ratingReducer, {});
  const { fetchData, postData } = useApi();
  const { data, saveData } = useLocalStorage(constants.STORAGE_KEYS.RATING);

  useEffect(() => {
    if (data && !state.sessions && !state.movies) {
      dispatch(setInitialData(data.sessions, data.movies));
    }
  }, [data]);

  useEffect(() => {
    if (state.getNewSession) {
      const fetchSession = async () => {
        const result = await fetchData(config.guestSessionUrl);
        dispatch(
          addNewSession(
            state.sessions,
            result.guest_session_id,
            result.expires_at
          )
        );
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
        await postData(url, { value: movieToRate.rating });
      };

      rateMovie();

      dispatch(setReadyToRate(false));
    }
  }, [state.readyToRate]);

  const addRating = (movie) => {
    if (
      movie.rating < constants.RATING.MIN ||
      movie.rating > constants.RATING.MAX
    ) {
      throw new Error(
        `Rating '${movie.rating}' is outside of the range [${constants.RATING.MIN} - ${constants.RATING.MAX}]`
      );
    }

    const isExpired = isSessionExpired(state.sessions);
    dispatch(addMovieRating(movie, isExpired));
  };

  return { ratedMovies: state?.movies, addRating };
};

export default useMovieRating;
