import { ACTIONS } from "./ratingActions";

const ratingReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_INITIAL_DATA:
      return { ...action.payload };
    case ACTIONS.ADD_MOVIE_RATING:
      return {
        ...state,
        movies: state?.movies
          ? [
              ...state.movies.filter((x) => x.id !== action.payload.movie.id),
              action.payload.movie,
            ]
          : [action.payload.movie],
      };
    case ACTIONS.GET_NEW_SESSION:
      return {
        ...state,
        session: {
          ...state.session,
          isExpired: action.payload.session.isExpired,
        },
      };
    case ACTIONS.SAVE_NEW_SESSION:
      return {
        ...state,
        session: { ...action.payload.session },
      };
    default:
      throw new Error("Unexpected action type");
  }
};

export default ratingReducer;
