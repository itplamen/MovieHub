import { useEffect, useReducer } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import styles from "./filter.module.css";
import constants from "@/data/constants.json";
import {
  setMovieType,
  setGenre,
  setYear,
  setSortOption,
} from "@/reducers/filter/filterActions";

import filterReducer from "@/reducers/filter/filterReducer";

const NONE_VALUE = {
  id: "",
  name: "None",
};

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - constants.FILTER_MOVIE_YEAR_MIN + 1 },
    (_, index) => currentYear - index
  );
  years.unshift(NONE_VALUE.name);

  return years;
};

const Filter = ({ search }) => {
  const [state, dispatch] = useReducer(filterReducer, {
    movieType: constants.MOVIE_TYPES[0].type,
    genreId: NONE_VALUE.id,
    year: NONE_VALUE.id,
    sortBy: constants.SORT_BY_OPTIONS[0].value,
  });

  const genres = constants.GENRES[state.movieType];
  !genres.find((x) => x.id === NONE_VALUE.id) && genres.unshift(NONE_VALUE);

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
              onChange={(event) => dispatch(setMovieType(event.target.value))}
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
              onChange={(event) => dispatch(setGenre(event.target.value))}
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
              onChange={(event) => dispatch(setYear(event.target.value))}
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
              onChange={(event) => dispatch(setSortOption(event.target.value))}
            >
              {constants.SORT_BY_OPTIONS.map((x) => (
                <option key={x.value} value={x.value}>
                  {x.description}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md>
          <Button
            variant="warning"
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
