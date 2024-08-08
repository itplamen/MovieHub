import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./header.module.css";
import { formatText } from "@/utils/formatters";

const Header = ({ text, breadcrumb }) => {
  return (
    <>
      <div className={styles.description}>
        {breadcrumb && breadcrumb.length > 0 && (
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            {breadcrumb.map((x, i) => (
              <Breadcrumb.Item
                href={`/${x.toLowerCase()}`}
                active={i === breadcrumb.length - 1}
              >
                {formatText(x)}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}

        <p>{formatText(text)}</p>
      </div>
    </>
  );
};

export default Header;
