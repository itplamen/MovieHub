import ProgressBar from "react-bootstrap/ProgressBar";

const Rating = ({ details }) => {
  return (
    <>
      <span>
        <b>Rating:</b> {details.vote_count} votes
      </span>
      <ProgressBar
        min={0}
        max={10}
        animated={true}
        now={details.vote_average}
        style={{ width: "30rem" }}
        label={`${Math.round(details.vote_average * 10)}%`}
      />
    </>
  );
};

export default Rating;
