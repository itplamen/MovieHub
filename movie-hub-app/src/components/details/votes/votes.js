import ProgressBar from "react-bootstrap/ProgressBar";

const Votes = ({ count, average }) => {
  return (
    <>
      <span>
        <b>Rating:</b> {count} votes
      </span>
      <ProgressBar
        min={0}
        max={10}
        animated={true}
        now={average}
        style={{ width: "30rem" }}
        label={`${Math.round(average * 10)}%`}
      />
    </>
  );
};

export default Votes;
