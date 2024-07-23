import ReactPlayer from "react-player";
import Carousel from "react-bootstrap/Carousel";
import styles from "../details.module.css";
import config from "@/data/configurations.json";

const Media = ({ videos }) => {
  return (
    videos.length > 0 && (
      <>
        <h4>Media</h4>
        <section className={styles.section}>
          <Carousel style={{ width: "100% " }}>
            {videos.slice(0, config.mediaMaxCount).map((x) => (
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
      </>
    )
  );
};

export default Media;
