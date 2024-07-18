import { Row, Col, Container, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import constants from "@/data/constants.json";
import useFetch from "@/hooks/useFetch";
import MovieCard from "./movieCard";
import Header from "../header/header";
import { useEffect, useRef, useState } from "react";

const MovieCardList = ({ type, description, url }) => {
  const [page, setPage] = useState(1);
  const { data: movies, refetch } = useFetch(url);
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      refetch(url, page);
    } else {
      isMounted.current = true;
    }
  }, [page]);

  return (
    <Container>
      <Header text={description} />
      <Row>
        {movies
          .slice(0, isHomePage ? constants.TRENDING_MOVIES_COUNT : -1)
          .map((x) => (
            <Col key={x.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <MovieCard posterImg={x.poster_path} />
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
          <Button
            variant="outline-dark"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </Button>
        )}
      </div>
    </Container>
  );
};

export default MovieCardList;
