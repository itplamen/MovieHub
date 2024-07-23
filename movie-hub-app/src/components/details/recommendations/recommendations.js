import Link from "next/link";
import styles from "./recommendations.module.css";
import detailsStyles from "../details.module.css";
import config from "@/data/configurations.json";

const Recommendations = ({ type, recommendations }) => {
  return (
    recommendations.length > 0 && (
      <>
        <h4>Recommendations</h4>
        <section className={detailsStyles.section}>
          {recommendations.slice(0, config.recommendationsMaxCount).map((x) => (
            <div key={x.id} className={styles.recommendation}>
              <Link href={`/${type}/${x.id}`}>
                <img
                  alt="Poster Img"
                  title={x.title}
                  className={styles.img}
                  src={`${config.imgBaseUrl}/${config.imageSizes.w500}/${x.poster_path}`}
                />
              </Link>
            </div>
          ))}
        </section>
      </>
    )
  );
};

export default Recommendations;
