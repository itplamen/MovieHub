import { Card } from "react-bootstrap";
import styles from "./movieCard.module.css";
import config from "@/data/configurations.json";

const MovieCard = ({ posterImg }) => {
  return (
    <Card className={styles.card}>
      <Card.Img
        variant="top"
        className={styles.cardImage}
        src={`${config.imgBaseUrl}/${posterImg}`}
      />
    </Card>
  );
};

export default MovieCard;
