import MovieCardList from "@/components/movieCard/movieCardList";
import { formatUrl } from "@/utils/formatters";
import Head from "next/head";
import { useRouter } from "next/router";
import config from "@/data/configurations.json";
import { Container } from "react-bootstrap";
import Header from "@/components/header/header";

const Search = () => {
  const router = useRouter();
  const { query } = router.query;

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container id="MainContainer">
        <Header text={`Search Result for "${query}"`} breadcrumb={query} />
        <MovieCardList
          type={"movie"}
          title={"Search"}
          url={formatUrl(config.searchUrl, { query })}
        />
      </Container>
    </>
  );
};

export default Search;
