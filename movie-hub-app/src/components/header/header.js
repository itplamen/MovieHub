import { useRouter } from "next/router";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./header.module.css";
import textFormatter from "@/utils/textFormatter";

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
              {textFormatter(currentPage)}
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        <p>{text}</p>
      </div>
    </>
  );
};

export default Header;
