import { useEffect, useReducer } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import styles from "./filter.module.css";
import constants from "@/data/constants.json";
import useGenres from "@/hooks/useGenres";

const NONE_VALUE = {
  id: "",
  name: "None",
};

const SORT_BY_OPTIONS = [
  {
    value: "popularity.desc",
    description: "Popularity Desc",
  },
  {
    value: "popularity.asc",
    description: "Popularity Asc",
  },
  {
    value: "primary_release_date.desc",
    description: "Release Date Desc",
  },
  {
    value: "primary_release_date.asc",
    description: "Release Date Asc",
  },
  {
    value: "vote_count.desc",
    description: "Vote Desc",
  },
  {
    value: "vote_count.asc",
    description: "Vote Asc",
  },
  {
    value: "original_title.asc",
    description: "Title (A-Z)",
  },
  {
    value: "original_title.desc",
    description: "Title (Z-A)",
  },
];

const ACTIONS = {
  SET_MOVIE_TYPE: "set-movie-type",
  SET_GENRE: "set-genre",
  SET_YEAR: "set-year",
  SET_SORT_OPTION: "set-sort-option",
};

const reducer = (state, action) => {
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
      throw new Error("Unexpected action type");
  }
};

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => currentYear - index
  );
  years.unshift(NONE_VALUE.name);

  return years;
};

const Filter = ({ search }) => {
  const [state, dispatch] = useReducer(reducer, {
    movieType: constants.MOVIE_TYPES[0].type,
    genreId: NONE_VALUE.id,
    year: NONE_VALUE.id,
    sortBy: SORT_BY_OPTIONS[0].value,
  });

  const genres = useGenres(state.movieType);
  !genres.find((x) => x.id === NONE_VALUE.id) && genres.unshift(NONE_VALUE);

  const handleMovieTypeChange = (event) => {
    dispatch({
      type: ACTIONS.SET_MOVIE_TYPE,
      payload: {
        movieType: event.target.value,
      },
    });
  };

  const handleGenreChange = (event) => {
    dispatch({
      type: ACTIONS.SET_GENRE,
      payload: {
        genreId: event.target.value,
      },
    });
  };

  const handleYearChange = (event) => {
    dispatch({
      type: ACTIONS.SET_YEAR,
      payload: {
        year: event.target.value,
      },
    });
  };

  const handleSortByOptionChange = (event) => {
    dispatch({
      type: ACTIONS.SET_SORT_OPTION,
      payload: {
        sortBy: event.target.value,
      },
    });
  };

  useEffect(() => {
    search({ ...state });
  }, []);

  return (
    <div id={styles.Filter}>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="movieTypeSelect" label="Type">
            <Form.Select
              size="sm"
              value={state.movieType}
              aria-label="Movie Type Label"
              onChange={handleMovieTypeChange}
            >
              {constants.MOVIE_TYPES.map((x) => (
                <option key={x.type} value={x.type}>
                  {x.description}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="movieGenreSelect" label="Genre">
            <Form.Select
              size="sm"
              value={state.genreId}
              aria-label="Movie Genre Label"
              onChange={handleGenreChange}
            >
              {genres.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="movieYearSelect" label="Year">
            <Form.Select
              size="sm"
              value={state.year}
              aria-label="Movie Year Label"
              onChange={handleYearChange}
            >
              {getYears().map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="movieSortBySelect" label="Sort By">
            <Form.Select
              size="sm"
              value={state.sortBy}
              aria-label="Movie Sort By Label"
              onChange={handleSortByOptionChange}
            >
              {SORT_BY_OPTIONS.map((x) => (
                <option key={x.value} value={x.value}>
                  {x.description}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md>
          <Button
            variant="outline-dark"
            onClick={() =>
              search({
                ...state,
              })
            }
          >
            Filter
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
