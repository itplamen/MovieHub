import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./rating.module.css";
import constants from "@/data/constants.json";
import useMovieRating from "@/hooks/useMovieRating";

const Rating = ({ movieType, movieId, movieTitle, movieImg }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState({
    value: 0,
    isMovieRated: false,
  });
  const rate = useMovieRating();

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setRating((prev) => {
      return { ...prev, value: 0 };
    });
    setShow(false);
  };

  const selectRating = (event) => {
    setRating((prev) => {
      return {
        ...prev,
        value: parseInt(event.target.attributes.value.value, 10),
      };
    });
  };

  const rateMovie = () => {
    rate({ type: movieType, id: movieId, img: movieImg, rating: rating.value });
    handleClose();
  };

  return (
    <>
      <Button
        id={styles.ShowRateBtn}
        variant={`${rating.isMovieRated ? "" : "outline-"}primary`}
        onClick={handleShow}
      >
        <i className={`bi bi-star${rating.isMovieRated ? "-fill" : ""}`}></i>{" "}
        <span>
          {rating.isMovieRated
            ? `${rating.value}/${constants.RATING.MAX}`
            : "Rate"}
        </span>
      </Button>

      <Modal show={show} onHide={handleClose} id={styles.RateModal} centered>
        <i
          id={styles.SelectedRatingIcon}
          className="bi bi-star-fill text-warning"
          style={{
            fontSize: `${
              rating.value > 0 ? 3 + (rating.value / 10) * 2 : 0
            }rem`,
          }}
        ></i>
        <Modal.Header closeButton>
          <Modal.Title id={styles.RateTitle}>{movieTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Array.from(
            { length: constants.RATING.MAX },
            (_, index) => index + 1
          ).map((x) => (
            <Button
              key={x}
              value={x}
              className={x <= rating.value ? styles.btnHover : ""}
              variant="outline-warning"
              onClick={selectRating}
            >
              <i value={x} className="bi bi-star-fill"></i>
            </Button>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={rating.value === 0}
            variant={`${rating.value > 0 ? "" : "outline-"}warning`}
            onClick={rateMovie}
            id={styles.RateBtn}
          >
            Rate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Rating;
