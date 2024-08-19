import { ACTIONS } from "./ratingActions";

const ratingReducer = (state, action) => {
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

export default ratingReducer;
