import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import useGenres from "@/hooks/useGenres";
import constants from "@/data/constants.json";
import Genre from "./genre";

const GnereList = () => {
  const genres = useGenres(constants.MOVIE_TYPES[0].type);

  return (
    <Row>
      {genres.map((x) => (
        <Col key={x.id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Link href={`/genres/${x.name.toLowerCase()}`}>
            <Genre name={x.name} />
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default GnereList;
