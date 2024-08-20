import { Collapse, Tab, Tabs } from "react-bootstrap";
import constants from "@/data/constants.json";
import config from "@/data/configurations.json";
import MovieCardList from "../movieCard/movieCardList";

const moviesHomeList = [
  {
    title: "Trending",
    url: config.trendingsUrl,
    key: constants.QUERY_KEYS.HOME_LIST.TRENDING,
  },
  {
    title: "Top Rated",
    url: config.topRatedUrl,
    key: constants.QUERY_KEYS.HOME_LIST.TOP_RATED,
  },
];

const MainHomeMovies = () => {
  return (
    <Tabs
      transition={Collapse}
      defaultActiveKey={constants.MOVIE_TYPES[0].type}
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
              style={{ marginBottom: "20px" }}
            >
              <h4>{`${homeList.title} ${movieType.description}`}</h4>
              <MovieCardList
                type={movieType.type}
                url={homeList.url}
                queryKey={homeList.key}
              />
            </div>
          ))}
        </Tab>
      ))}
    </Tabs>
  );
};

export default MainHomeMovies;
