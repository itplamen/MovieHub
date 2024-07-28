import { useRouter } from "next/router";
import Head from "next/head";
import constants from "@/data/constants.json";
import MovieCardList from "@/components/movieCard/movieCardList";

const Trending = () => {
  const router = useRouter();
  const { type } = router.query;
  const trending = constants.MOVIE_TYPES.find((obj) => obj.type === type);

  return (
    <>
      {trending && (
        <>
          <Head>
            <title>{`Trending ${trending.description}`}</title>
            <meta
              name="description"
              content={`Trending ${trending.description}`}
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <MovieCardList {...trending} />
        </>
      )}
    </>
  );
};

export default Trending;
