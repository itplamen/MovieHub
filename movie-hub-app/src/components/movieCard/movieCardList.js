import { Row, Col, Container, Button } from "react-bootstrap";
import constants from "@/data/constants.json";
import useFetch from "@/hooks/useFetch";
import MovieCard from "./movieCard";
import Header from "../header/header";

const MovieCardList = ({ url, description }) => {
  const movies = useFetch(url);

  return (
    <Container>
      <Header text={description} />

      <Row>
        {movies.slice(0, constants.TRENDING_MOVIES_COUNT).map((x) => (
          <Col key={x.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <MovieCard posterImg={x.poster_path} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center">
        <Button variant="outline-dark">Show All</Button>
      </div>
    </Container>
  );
};

export default MovieCardList;
