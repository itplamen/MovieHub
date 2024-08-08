import { useRouter } from "next/router";
import config from "@/data/configurations.json";
import constants from "@/data/constants.json";
import MovieCardList from "@/components/movieCard/movieCardList";
import { formatDiscoverUrl } from "@/utils/formatters";
import useGenres from "@/hooks/useGenres";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/header/header";
import { Container } from "react-bootstrap";

const Genre = () => {
  const [url, setUrl] = useState();
  const router = useRouter();
  const { type } = router.query;
  const genres = useGenres(constants.MOVIE_TYPES[0].type);

  useEffect(() => {
    if (router.isReady && genres.length > 0) {
      const genre = genres.find(
        (x) => x.name.toLowerCase() === type.toLowerCase()
      );
      setUrl(formatDiscoverUrl(config.discoverUrl, { genreId: genre.id }));
    }
  }, [router.isReady, genres.length > 0]);

  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="Favorites" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container id="MainContainer">
        {type && <Header text={type} breadcrumb={["genres", type]} />}
        {url && (
          <MovieCardList type={constants.MOVIE_TYPES[0].type} url={url} />
        )}
      </Container>
    </>
  );
};

export default Genre;
