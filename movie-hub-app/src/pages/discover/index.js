import Head from "next/head";
import constants from "@/data/constants.json";
import config from "@/data/configurations.json";
import MovieCardList from "@/components/movieCard/movieCardList";

const Discover = () => {
  return (
    <>
      <Head>
        <title>Discover Movies</title>
        <meta name="description" content="Discover Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MovieCardList
        type={constants.MOVIE_TYPES[0].type}
        title={`Discover ${constants.MOVIE_TYPES[0].description}`}
        url={config.trendingsUrl}
      />
    </>
  );
};

export default Discover;
