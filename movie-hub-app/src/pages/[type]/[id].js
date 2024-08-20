import { useRouter } from "next/router";
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
        <Header text={`${type}/${details.original_title ?? details.name}`} />
        <Details details={details} type={type} />
        <Cast members={details.credits.cast} />
        <Reviews reviews={details.reviews.results} />
        <Media videos={details.videos.results} />
        <Recommendations
          type={type}
          recommendations={details.recommendations.results}
        />
      </>
    )
  );
};

MovieInfo.getInitialProps = async () => {
  return { hasCustomHeader: true, title: "Movie Details" };
};

export default MovieInfo;
