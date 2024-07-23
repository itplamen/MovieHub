import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

import Header from "@/components/header/header";
import useMovieDetails from "@/hooks/useMovieDetails";
import Recommendations from "@/components/details/recommendations/recommendations";
import Media from "@/components/details/media/media";
import Reviews from "@/components/details/reviews/reviews";
import Cast from "@/components/details/cast/cast";
import Details from "@/components/details/details";

const MovieInfo = () => {
  const router = useRouter();
  const { type, id } = router.query;

  const details = useMovieDetails(type, id);
  return (
    details && (
      <>
        <Head>
          <title>Details</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          <Header text={"Details"} />
          <Details details={details} />
          <Cast members={details.credits.cast} />
          <Reviews reviews={details.reviews.results} />
          <Media videos={details.videos.results} />
          <Recommendations
            type={type}
            recommendations={details.recommendations.results}
          />
        </Container>
      </>
    )
  );
};

export default MovieInfo;
