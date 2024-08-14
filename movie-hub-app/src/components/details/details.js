import { useState } from "react";

import styles from "./details.module.css";
import config from "@/data/configurations.json";
import Translation from "./translation/translation";
import { Col, Row } from "react-bootstrap";
import Favorites from "./favorites/favorites";
import Votes from "./votes/votes";
import Rating from "./rating/rating";

const formatAmount = (amount) => {
  const scaledamount = amount / 100;

  return scaledamount.toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Details = ({ details, type }) => {
  const [language, setLanguage] = useState(
    details.translations.translations.find(
      (x) =>
        x.iso_3166_1 === config.defaultLanguage.iso_3166_1 &&
        x.iso_639_1 === config.defaultLanguage.iso_639_1
    )
  );

  const posterImg = `${config.imgBaseUrl}/${config.imageSizes.w500}/${details.poster_path}`;
  const movieYear = new Date(
    details.release_date ?? details.first_air_date
  ).getFullYear();

  const handleLanguageSelect = (iso_3166_1, iso_639_1) => {
    // TODO: add more validations
    const selected = details.translations.translations.find(
      (x) => x.iso_3166_1 === iso_3166_1 && x.iso_639_1 === iso_639_1
    );
    setLanguage(selected);
  };

  return (
    <>
      <Translation
        selectedLanguage={{
          code: language.iso_639_1,
          key: language.iso_3166_1,
        }}
        setSelectedLanguage={handleLanguageSelect}
        translations={details.translations.translations}
      />
      <section className={styles.section} style={{ overflow: "hidden" }}>
        <div className={styles.poster}>
          <img alt="Poster Img" className={styles.posterImg} src={posterImg} />
        </div>
        <div className={styles.info}>
          <div>
            <h2 className={styles.title}>
              {language.data.title
                ? language.data.title
                : language.data.name
                ? language.data.name
                : details.original_title ?? details.name}
              <span className={styles.year}>({movieYear})</span>
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
            <Row>
              <Col>
                <Votes
                  count={details.vote_count}
                  average={details.vote_average}
                />
              </Col>
              <Col>
                <Rating
                  movieType={type}
                  movieId={details.id}
                  movieTitle={`${
                    details.original_title ?? details.name
                  } (${movieYear})`}
                  movieImg={posterImg}
                />
                <Favorites details={details} type={type} />
              </Col>
            </Row>
          </div>
          <p className={styles.overview}>
            <i>{language.data.tagline}</i> <br />
            <span>{language.data.overview}</span>
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
    </>
  );
};

export default Details;
