import Head from "next/head";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/header/header";
import MovieCard from "@/components/movieCard/movieCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import constants from "@/data/constants.json";

const Favorites = () => {
  const { data } = useLocalStorage(constants.STORAGE_KEYS.FAVORITES);

  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="Favorites" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container id="MainContainer">
        <Header text="Favorites" />
        <Row>
          {data &&
            data.map((x) => (
              <Col key={x.key} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Link href={`/${x.value.type}/${x.key}`}>
                  <MovieCard posterImg={x.value.posterImg} />
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Favorites;
