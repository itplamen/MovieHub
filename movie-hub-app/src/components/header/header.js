import styles from "./header.module.css";

const Header = ({ text }) => {
  return (
    <div className={styles.description}>
      <p>{text}</p>
    </div>
  );
};

export default Header;
