import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./header.module.css";
import { formatText } from "@/utils/formatters";

const Header = ({ text }) => {
  const breadcrumbItems = text.split("/").filter((x) => x !== "");

  return (
    <>
      <div className={styles.description}>
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            {breadcrumbItems.map((x, i) => (
              <Breadcrumb.Item
                key={x.toLowerCase().replace(" ", "_")}
                href={`/${x.toLowerCase()}`}
                active={i === breadcrumbItems.length - 1}
              >
                {formatText(x)}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}

        <p>{formatText(breadcrumbItems.at(-1))}</p>
      </div>
    </>
  );
};

export default Header;
