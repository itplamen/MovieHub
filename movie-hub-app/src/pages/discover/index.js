import Head from "next/head";
import constants from "@/data/constants.json";
import config from "@/data/configurations.json";
import MovieCardList from "@/components/movieCard/movieCardList";
import Header from "@/components/header/header";
import { Container } from "react-bootstrap";
import Filter from "@/components/filter/filter";
import { formatDiscoverUrl } from "@/utils/formatters";
import { useState } from "react";
const Discover = () => {
  const [url, setUrl] = useState();
  const [type, setType] = useState(constants.MOVIE_TYPES[0].type);

  const search = ({ movieType, genreId, year, sortBy }) => {
    const discoverUrl = formatDiscoverUrl(config.discoverUrl, {
      genreId,
      year,
      sortBy,
    });

    setUrl(discoverUrl);
    setType(movieType);
  };

  return (
    <>
      <Head>
        <title>Discover Movies</title>
        <meta name="description" content="Discover Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container id="MainContainer">
        <Header text="Discover Movies" />
        <Filter search={search} />
        {type && url && (
          <MovieCardList
            type={type}
            title={`Discover ${
              constants.MOVIE_TYPES.find((x) => x.type === type).description
            }`}
            url={url}
          />
        )}
      </Container>
    </>
  );
};

export default Discover;
