import Head from "next/head";
import { Container } from "react-bootstrap";
import Header from "@/components/header/header";
import GnereList from "@/components/genres/genreList";

const Genres = () => {
  return (
    <>
      <Head>
        <title>Genres</title>
        <meta name="description" content="Genres" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container id="MainContainer">
        <Header text="Genres" breadcrumb={["Genres"]} />
        <GnereList />
      </Container>
    </>
  );
};

export default Genres;
