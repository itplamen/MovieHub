import Head from "next/head";
import MainHomeMovies from "@/components/home/mainHomeMovies";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHomeMovies />
    </>
  );
}
