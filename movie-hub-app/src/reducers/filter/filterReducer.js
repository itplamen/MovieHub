import { ACTIONS } from "./filterActions";

const filterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_MOVIE_TYPE:
      return {
        ...state,
        movieType: action.payload.movieType,
      };
    case ACTIONS.SET_GENRE:
      return {
        ...state,
        genreId: action.payload.genreId,
      };
    case ACTIONS.SET_YEAR:
      return {
        ...state,
        year: action.payload.year,
      };
    case ACTIONS.SET_SORT_OPTION:
      return {
        ...state,
        sortBy: action.payload.sortBy,
      };
    default:
      throw new Error("Unexpected filter action type");
  }
};

export default filterReducer;
