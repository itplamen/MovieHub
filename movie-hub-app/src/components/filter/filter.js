import { useEffect, useReducer } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Option from "./option/option";
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

  const genres = [{ ...NONE_VALUE }, ...constants.GENRES[state.movieType]];

  useEffect(() => {
    search({ ...state });
  }, []);

  return (
    <div id={styles.Filter}>
      <Row className="g-2">
        <Col md>
          <Option
            label="Type"
            value={state.movieType}
            handleChange={(event) => dispatch(setMovieType(event.target.value))}
          >
            {constants.MOVIE_TYPES.map((x) => (
              <option key={x.type} value={x.type}>
                {x.description}
              </option>
            ))}
          </Option>
        </Col>
        <Col md>
          <Option
            label="Genre"
            value={state.genreId}
            handleChange={(event) => dispatch(setGenre(event.target.value))}
          >
            {genres.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </Option>
        </Col>
        <Col md>
          <Option
            label="Year"
            value={state.year}
            handleChange={(event) => dispatch(setYear(event.target.value))}
          >
            {getYears().map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Option>
        </Col>
        <Col md>
          <Option
            label="Sort By"
            value={state.sortBy}
            handleChange={(event) =>
              dispatch(setSortOption(event.target.value))
            }
          >
            {constants.SORT_BY_OPTIONS.map((x) => (
              <option key={x.value} value={x.value}>
                {x.description}
              </option>
            ))}
          </Option>
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
