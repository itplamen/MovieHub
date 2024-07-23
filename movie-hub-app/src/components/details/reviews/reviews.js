import Accordion from "react-bootstrap/Accordion";
import styles from "./reviews.module.css";
import detailsStyles from "../details.module.css";
import config from "@/data/configurations.json";

const Reviews = ({ reviews }) => {
  return (
    reviews.length > 0 && (
      <>
        <h4>Top Reviews</h4>
        <section className={detailsStyles.section}>
          <Accordion defaultActiveKey="0">
            {reviews.slice(0, config.reviewsMaxCount).map((x, i) => (
              <Accordion.Item key={x.id} eventKey={`${i}`}>
                <Accordion.Header>
                  {x.author_details.avatar_path ? (
                    <img
                      className={styles.authorAvatar}
                      alt="Author Avatar"
                      src={`${config.imgBaseUrl}/${config.imageSizes.w92}/${x.author_details.avatar_path}`}
                    />
                  ) : (
                    <div className={styles.authorAvatar}></div>
                  )}

                  <b>A review by {x.author}</b>
                  <small style={{ marginLeft: "6px" }}>
                    ({new Date(x.created_at).toLocaleDateString()})
                  </small>
                </Accordion.Header>
                <Accordion.Body>{x.content}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </section>
      </>
    )
  );
};

export default Reviews;
