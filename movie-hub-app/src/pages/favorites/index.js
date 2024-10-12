import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import MovieCard from "@/components/movieCard/movieCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import constants from "@/data/constants.json";

const Favorites = () => {
  const { data } = useLocalStorage(constants.STORAGE_KEYS.FAVORITES);

  return (
    <>
      <Row>
        {data &&
          data.map((x) => (
            <Col key={x.tag} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Link href={`/${x.value.type}/${x.tag}`}>
                <MovieCard posterImg={x.value.posterImg} />
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Favorites;
