import { useRouter } from "next/router";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./header.module.css";
import { formatText } from "@/utils/formatters";

const Header = ({ text, breadcrumb }) => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      <div className={styles.description}>
        {type && (
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            {type && breadcrumb && (
              <Breadcrumb.Item href={`/${type}`}>
                {formatText(type)}
              </Breadcrumb.Item>
            )}
            <Breadcrumb.Item active>
              {formatText(breadcrumb ?? type)}
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        <p>{text}</p>
      </div>
    </>
  );
};

export default Header;
