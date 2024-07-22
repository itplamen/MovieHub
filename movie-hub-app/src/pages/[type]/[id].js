import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import styles from "./details.module.css";
import config from "@/data/configurations.json";
import Header from "@/components/header/header";
import useMovieDetails from "@/hooks/useMovieDetails";
import ProgressBar from "react-bootstrap/ProgressBar";
import Accordion from "react-bootstrap/Accordion";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import ReactPlayer from "react-player";
import Link from "next/link";

const formatAmount = (amount) => {
  let scaledamount = amount / 100;

  return scaledamount.toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Details = () => {
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
          <section className={styles.section}>
            <div className={styles.poster}>
              <img
                src={`${config.imgBaseUrl}/${config.imageSizes.w500}/${details.poster_path}`}
                alt="Poster Img"
                className={styles.img}
              />
            </div>
            <div className={styles.info}>
              <div>
                <h2 className={styles.title}>
                  {details.original_title ?? details.name} (
                  {new Date(
                    details.release_date ?? details.first_air_date
                  ).getFullYear()}
                  )
                </h2>
                <div className={styles.facts}>
                  <span>
                    {new Date(
                      details.release_date ?? details.first_air_date
                    ).toLocaleDateString()}{" "}
                    ({details.origin_country.map((x) => x).join(", ")})
                  </span>
                  <span>{details.genres.map((x) => x.name).join(", ")}</span>
                  {details.runtime && <span>{details.runtime} min</span>}
                </div>
              </div>
              <div>
                <span>
                  <b>Rating:</b> {details.vote_count} votes
                </span>
                <ProgressBar
                  className={styles.rating}
                  animated={true}
                  min={0}
                  max={10}
                  now={details.vote_average}
                  label={`${Math.round(details.vote_average * 10)}%`}
                />
              </div>
              <p className={styles.overview}>
                <i>{details.tagline}</i> <br />
                <span>{details.overview}</span>
              </p>
              <div>
                <ol className={styles.boxOffice}>
                  <li>
                    <h6>Status</h6>
                    {details.status}
                  </li>
                  {details.budget && (
                    <li>
                      <h6>Budget</h6>
                      {formatAmount(details.budget)}
                    </li>
                  )}
                  {details.revenue && (
                    <li>
                      <h6>Revenue</h6>
                      {formatAmount(details.revenue)}
                    </li>
                  )}
                  {details.production_companies
                    .filter((x) => x.logo_path != null)
                    .slice(0, 4)
                    .map((x) => (
                      <li key={x.id}>
                        <img
                          alt={x.name}
                          title={x.name}
                          src={`${config.imgBaseUrl}/${config.imageSizes.w92}/${x.logo_path}`}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </section>
          <h4>Cast Members ({details.credits.cast.length})</h4>
          <section className={styles.section}>
            <div className={styles.cast}>
              {details.credits.cast.map((x) => (
                <div key={x.id}>
                  <Card className={styles.castCard}>
                    {x.profile_path ? (
                      <Card.Img
                        variant="top"
                        className={styles.castImg}
                        src={`${config.imgBaseUrl}/${config.imageSizes.w500}/${x.profile_path}`}
                      />
                    ) : (
                      <div className={styles.castImg}></div>
                    )}
                    <Card.Body>
                      <Card.Subtitle style={{ fontSize: "0.9rem" }}>
                        {x.name}
                      </Card.Subtitle>
                      <p style={{ marginTop: "0.3rem", fontSize: "0.7rem" }}>
                        {x.character}
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {details.reviews.results.length > 0 && (
            <section className={styles.sectionNoFlex}>
              <h4>Top Reviews</h4>
              <Accordion defaultActiveKey="0">
                {details.reviews.results.slice(0, 5).map((x, i) => (
                  <Accordion.Item key={x.id} eventKey={`${i}`}>
                    <Accordion.Header>
                      {x.author_details.avatar_path ? (
                        <img
                          className={styles.authorAvatar}
                          alt="Author Avatar"
                          src={`${config.imgBaseUrl}/${config.imageSizes.w92}/${x.author_details.avatar_path}`}
                        />
                      ) : (
                        <div className={styles.authorAvatar}></div>
                      )}

                      <b>A review by {x.author}</b>
                      <small style={{ marginLeft: "6px" }}>
                        ({new Date(x.created_at).toLocaleDateString()})
                      </small>
                    </Accordion.Header>
                    <Accordion.Body>{x.content}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </section>
          )}

          <section className={styles.sectionNoFlex}>
            <h4>Media</h4>
            <Carousel>
              {details.videos.results.slice(0, 5).map((x) => (
                <Carousel.Item key={x.id}>
                  <ReactPlayer
                    url={`${config.videoBaseUrl}${x.key}`}
                    width="100%"
                    pip={true}
                    controls={true}
                    playing={false}
                  />
                  <Carousel.Caption>
                    <h3>{x.name}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </section>
          {details.recommendations.results.length > 0 && (
            <>
              <h4>Recommendations</h4>
              <section className={styles.section}>
                {details.recommendations.results.slice(0, 6).map((x) => (
                  <div key={x.id} className={styles.recommendation}>
                    <Link href={`/${type}/${x.id}`}>
                      <img
                        src={`${config.imgBaseUrl}/${config.imageSizes.w500}/${x.poster_path}`}
                        alt="Poster Img"
                        className={styles.img}
                      />
                    </Link>
                  </div>
                ))}
              </section>
            </>
          )}
        </Container>
      </>
    )
  );
};

export default Details;
