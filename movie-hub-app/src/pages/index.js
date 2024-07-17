import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "@/data/configurations.json";
import MovieCardList from "@/components/movieCard/movieCardList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MovieCardList
        url={config.trendingMoviesUrl}
        description={"Trending Movies"}
      />

      <MovieCardList
        url={config.trendingTvUrl}
        description={"Trending TV Shows"}
      />
    </>
  );
}
