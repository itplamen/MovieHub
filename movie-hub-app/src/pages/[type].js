import { useRouter } from "next/router";
import Head from "next/head";
import config from "@/data/configurations.json";
import MovieCardList from "@/components/movieCard/movieCardList";
import textFormatter from "@/utils/textFormatter";

const Trending = () => {
  const router = useRouter();
  const { type } = router.query;
  const trending = config.trendings.find((obj) => obj.type === type);

  return (
    <>
      {trending && (
        <>
          <Head>
            <title>{textFormatter(type)}</title>
            <meta
              name="description"
              content={`Trending ${textFormatter(type)}`}
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
