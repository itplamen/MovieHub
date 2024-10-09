import { useEffect, useReducer } from "react";
import config from "@/data/configurations.json";
import constants from "@/data/constants.json";
import useApi from "./useApi";
import useLocalStorage from "./useLocalStorage";
import { formatUrl } from "@/utils/formatters";
import {
  setInitialData,
  addMovieRating,
  getNewSession,
  saveNewSession,
} from "@/reducers/rating/ratingActions";
import ratingReducer from "@/reducers/rating/ratingReducer";
import { useMutation, useQuery } from "@tanstack/react-query";

const isSessionExpired = (session) => {
  if (session) {
    const now = new Date();
    let utcNow = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    const expDate = new Date(session.expDate);
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
  const { fetchData, postData } = useApi();
  const [state, dispatch] = useReducer(ratingReducer, {});
  const { data, saveData } = useLocalStorage(constants.STORAGE_KEYS.RATING);

  const { data: newSession, isSuccess } = useQuery({
    queryKey: ["NewSession"],
    gcTime: 0,
    queryFn: () => fetchData(config.guestSessionUrl),
    refetchOnWindowFocus: false,
    enabled: !!state?.session?.isExpired,
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => {
      const movieToRate = state.movies.at(-1);
      const url = formatUrl(config.addRatingUrl, {
        type: movieToRate.type,
        id: movieToRate.id,
        sessionId: state?.session?.id,
      });
      return postData(url, { value: movieToRate.rating });
    },
    onSuccess: () => {
      saveData({
        movies: [...state.movies],
        tag: "movies",
      });
    },
  });

  useEffect(() => {
    const session = data?.find((x) => x.tag === "session")?.session;
    const movies = data?.find((x) => x.tag === "movies")?.movies;

    if (session && movies && !state.session && !state.movies) {
      dispatch(setInitialData(session, movies));
    }
  }, [data?.length]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        saveNewSession(newSession.guest_session_id, newSession.expires_at)
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (
      state?.session?.id !== data?.find((x) => x.tag === "session")?.session?.id
    ) {
      saveData({
        session: { ...state.session },
        tag: "session",
      });
    }
  }, [state?.session?.id]);

  useEffect(() => {
    const rateMove = async () => {
      await mutateAsync();
    };

    if (state?.movies?.length > 0 && !state?.session?.isExpired) {
      const prevRating =
        data
          ?.find((x) => x.tag === "movies")
          ?.movies?.find((x) => x.id === state.movies.at(-1).id)?.rating ?? 0;

      if (prevRating !== state.movies.at(-1).rating) {
        rateMove();
      }
    }
  }, [
    state?.movies?.at(-1)?.id,
    state?.movies?.at(-1)?.rating,
    state?.session?.isExpired,
  ]);

  const addRating = (movie) => {
    if (
      movie.rating < constants.RATING.MIN ||
      movie.rating > constants.RATING.MAX
    ) {
      throw new Error(
        `Rating '${movie.rating}' value is outside of the range [${constants.RATING.MIN} - ${constants.RATING.MAX}]`
      );
    }

    const isExpired = isSessionExpired(state.session);
    dispatch(getNewSession(isExpired));
    dispatch(addMovieRating(movie));
  };

  return { ratedMovies: state?.movies, addRating };
};

export default useMovieRating;
