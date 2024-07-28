import Head from "next/head";
import constants from "@/data/constants.json";
import MovieCardList from "@/components/movieCard/movieCardList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {constants.MOVIE_TYPES.map((x) => (
        <MovieCardList key={x.type} {...x} />
      ))}
    </>
  );
}
