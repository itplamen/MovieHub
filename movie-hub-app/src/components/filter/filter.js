import { Col, Row } from "react-bootstrap";
import Option from "./option/option";
import styles from "./filter.module.css";
import constants from "@/data/constants.json";
import {
  setMovieType,
  setGenre,
  setYear,
  setSortOption,
} from "@/reducers/filter/filterActions";

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - constants.FILTER_MOVIE_YEAR_MIN + 1 },
    (_, index) => currentYear - index
  );
  years.unshift("All");

  return years;
};

const Filter = ({ movieType, genreId, year, sortBy, handleSearch }) => {
  const genres = [
    { ...constants.DEFAULT_FILTER_VALUE },
    ...constants.GENRES[movieType],
  ];

  return (
    <div id={styles.Filter}>
      <Row className="g-2">
        <Col md>
          <Option
            label="Type"
            value={movieType}
            handleChange={(event) =>
              handleSearch(setMovieType(event.target.value))
            }
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
            value={genreId}
            handleChange={(event) => handleSearch(setGenre(event.target.value))}
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
            value={year}
            handleChange={(event) => handleSearch(setYear(event.target.value))}
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
            value={sortBy}
            handleChange={(event) =>
              handleSearch(setSortOption(event.target.value))
            }
          >
            {constants.SORT_BY_OPTIONS.map((x) => (
              <option key={x.value} value={x.value}>
                {x.description}
              </option>
            ))}
          </Option>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
