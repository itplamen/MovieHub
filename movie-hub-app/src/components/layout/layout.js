import Head from "next/head";
import { usePathname } from "next/navigation";
import { Container } from "react-bootstrap";
import styles from "./layout.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Navigation from "../navigation/navigation";
import { formatText } from "@/utils/formatters";

const Layout = ({ children }) => {
  const pathName = usePathname();
  const isHomePage = pathName && pathName === "/";
  const title =
    children?.props?.title ??
    (pathName &&
      pathName
        .split("/")
        .filter((x) => x !== "")
        .at(-1));

  return (
    <>
      <Head>
        <title>{isHomePage ? "Movie Hub" : formatText(title ?? "")}</title>
        <meta
          name="description"
          content="Discover the latest releases, watch trailers, and explore a vast database of films, actors, and genres."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div id={styles.PageContainer}>
        <Container id={styles.MainContainer}>
          {!isHomePage && pathName && !children?.props?.hasCustomHeader && (
            <Header text={pathName} />
          )}
          {children}
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
