import useGenres from "@/hooks/useGenres";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./navigation.module.css";
import { Col, Row } from "react-bootstrap";
import SearchBar from "./searchBar/searchbar";

const Navigation = () => {
  const genres = useGenres("movie");

  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">MovieHub</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/discover">Discover</Nav.Link>

            <NavDropdown
              title="Genres"
              id="basic-nav-dropdown"
              className={styles.genres}
            >
              <Row md={4}>
                {genres.map((x) => (
                  <Col key={x.id} className={styles.genreItem}>
                    <NavDropdown.Item href={`/genre/${x.name.toLowerCase()}`}>
                      {x.name}
                    </NavDropdown.Item>
                  </Col>
                ))}
              </Row>
            </NavDropdown>

            <SearchBar />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
