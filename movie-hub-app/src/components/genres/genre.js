import { Card } from "react-bootstrap";
import styles from "./genres.module.css";

const Genre = ({ name }) => {
  return (
    <Card
      bg="dark"
      key="dark"
      text={"white"}
      className={`${styles.genre} mb-2`}
    >
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Genre;
