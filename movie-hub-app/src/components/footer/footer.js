import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div id={styles.Footer} className="bg-body-tertiary">
      <small>
        Developed by {""}
        <a target="_blank" href="https://github.com/itplamen/MovieHub">
          itplamen
        </a>
      </small>
    </div>
  );
};

export default Footer;
