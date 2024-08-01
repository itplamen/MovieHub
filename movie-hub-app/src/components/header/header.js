import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./header.module.css";
import { formatText } from "@/utils/formatters";
import { useRouter } from "next/router";

const Header = ({ text, breadcrumb }) => {
  const router = useRouter();
  const { type } = router.query;
  const route = router.route.replace(/^\//, "");

  return (
    <>
      <div className={styles.description}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          {breadcrumb && type && (
            <Breadcrumb.Item href={`/${type ?? breadcrumb}`}>
              {formatText(type)}
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item active>
            {formatText(type ? breadcrumb : route)}
          </Breadcrumb.Item>
        </Breadcrumb>

        <p>{text}</p>
      </div>
    </>
  );
};

export default Header;
