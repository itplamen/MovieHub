import { Row, Col, Container, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import constants from "@/data/constants.json";
import useMovieList from "@/hooks/useMovieList";
import MovieCard from "./movieCard";
import Header from "../header/header";
import Link from "next/link";

const MovieCardList = ({ type, description }) => {
  const { movies, loadMore } = useMovieList(type);
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <Container>
      <Header text={`Trending ${description}`} />
      <Row>
        {movies
          .slice(0, isHomePage ? constants.TRENDING_MOVIES_COUNT : -1)
          .map((x) => (
            <Col key={x.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Link href={`/${type}/${x.id}`}>
                <MovieCard posterImg={x.poster_path} />
              </Link>
            </Col>
          ))}
      </Row>
      <div className="d-flex justify-content-center">
        {isHomePage ? (
          <Button
            variant="outline-dark"
            onClick={() => router.push(`/${type}`)}
          >
            Show All
          </Button>
        ) : (
          <Button variant="outline-dark" onClick={loadMore}>
            Load More
          </Button>
        )}
      </div>
    </Container>
  );
};

export default MovieCardList;
