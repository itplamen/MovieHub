import { useRouter } from "next/router";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./header.module.css";

const Header = ({ text }) => {
  const router = useRouter();
  const { type: currentPage } = router.query;

  return (
    <>
      <div className={styles.description}>
        {currentPage && (
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        <p>{text}</p>
      </div>
    </>
  );
};

export default Header;
