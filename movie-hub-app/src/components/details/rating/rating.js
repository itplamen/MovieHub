import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./rating.module.css";
import constants from "@/data/constants.json";
import useMovieRating from "@/hooks/useMovieRating";

const Rating = ({ movieType, movieId, movieTitle, movieImg }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState();
  const { ratedMovies, addRating } = useMovieRating();

  useEffect(() => {
    const value = ratedMovies?.find((x) => x.id === movieId)?.rating ?? 0;
    setRating({
      value: value,
      tempValue: 0,
      isMovieRated: value > 0,
    });
  }, [ratedMovies]);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setRating((prev) => {
      return { ...prev, tempValue: 0 };
    });
    setShow(false);
  };

  const selectRating = (event) => {
    setRating((prev) => {
      return {
        ...prev,
        tempValue: parseInt(event.target.attributes.value.value, 10),
      };
    });
  };

  const rateMovie = () => {
    addRating({
      type: movieType,
      id: movieId,
      img: movieImg,
      rating: rating.tempValue,
    });
    setRating({
      value: rating.tempValue,
      tempValue: 0,
      isMovieRated: true,
    });
    handleClose();
  };

  return (
    rating && (
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
                rating.tempValue > 0 ? 3 + (rating.tempValue / 10) * 2 : 0
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
                className={x <= rating.tempValue ? styles.btnHover : ""}
                variant="outline-warning"
                onClick={selectRating}
              >
                <i value={x} className="bi bi-star-fill"></i>
              </Button>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={rating.tempValue === 0}
              variant={`${rating.tempValue > 0 ? "" : "outline-"}warning`}
              onClick={rateMovie}
              id={styles.RateBtn}
            >
              Rate
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};

export default Rating;
