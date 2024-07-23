import Card from "react-bootstrap/Card";
import styles from "./cast.module.css";
import detailsStyles from "../details.module.css";
import config from "@/data/configurations.json";

const Cast = ({ members }) => {
  return (
    members.length > 0 && (
      <>
        <h4>Cast Members ({members.length})</h4>
        <section className={detailsStyles.section}>
          <div className={styles.cast}>
            {members.map((x) => (
              <div key={x.id}>
                <Card className={styles.card}>
                  {x.profile_path ? (
                    <Card.Img
                      variant="top"
                      title={x.name}
                      className={styles.img}
                      src={`${config.imgBaseUrl}/${config.imageSizes.w500}/${x.profile_path}`}
                    />
                  ) : (
                    <div className={styles.img}></div>
                  )}
                  <Card.Body>
                    <Card.Subtitle className={styles.name}>
                      {x.name}
                    </Card.Subtitle>
                    <p className={styles.character}>{x.character}</p>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </>
    )
  );
};

export default Cast;
