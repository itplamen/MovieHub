import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import constants from "@/data/constants.json";
import useMovieList from "@/hooks/useMovieList";
import MovieCard from "./movieCard";
import Link from "next/link";

const MovieCardList = ({ type, url }) => {
  const { movies, loadMore } = useMovieList(url, type);
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <>
      <Row>
        {(isHomePage
          ? movies.slice(0, constants.HOME_MOVIES_COUNT)
          : movies
        ).map((x) => (
          <Col key={x.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Link href={`/${type}/${x.id}`}>
              <MovieCard posterImg={x.poster_path} />
            </Link>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center">
        {!isHomePage && (
          <Button variant="outline-dark" onClick={loadMore}>
            Load More
          </Button>
        )}
      </div>
    </>
  );
};

export default MovieCardList;
