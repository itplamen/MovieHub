import { Collapse, Container, Tab, Tabs } from "react-bootstrap";
import styles from "./mainHomeMovies.module.css";
import constants from "@/data/constants.json";
import config from "@/data/configurations.json";
import MovieCardList from "../movieCard/movieCardList";

const moviesHomeList = [
  {
    title: "Trending",
    url: config.trendingsUrl,
  },
  {
    title: "Top Rated",
    url: config.topRatedUrl,
  },
];

const MainHomeMovies = () => {
  return (
    <Container>
      <Tabs
        transition={Collapse}
        defaultActiveKey={constants.MOVIE_TYPES[0].type}
        id={styles.MainHomeMovies}
        className="mb-3"
      >
        {constants.MOVIE_TYPES.map((movieType) => (
          <Tab
            key={movieType.type}
            eventKey={movieType.type}
            title={movieType.description}
          >
            {moviesHomeList.map((homeList) => (
              <div
                key={`${homeList.title.replace(" ", "_")}_${movieType.type}`}
                className={styles.movieList}
              >
                <MovieCardList
                  type={movieType.type}
                  title={`${homeList.title} ${movieType.description}`}
                  url={homeList.url}
                />
              </div>
            ))}
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default MainHomeMovies;
