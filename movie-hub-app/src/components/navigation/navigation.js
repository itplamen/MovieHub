import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Row } from "react-bootstrap";
import constants from "@/data/constants.json";
import SearchBar from "./searchBar/searchbar";

const Navigation = () => {
  const genres = constants.GENRES[constants.MOVIE_TYPES[0].type];

  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">MovieHub</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/discover">Discover</Nav.Link>
            <NavDropdown title="Genres" id="basic-nav-dropdown">
              <Row md={4} style={{ width: "36rem" }}>
                {genres.map((x) => (
                  <Col key={x.id}>
                    <NavDropdown.Item href={`/genres/${x.name.toLowerCase()}`}>
                      {x.name}
                    </NavDropdown.Item>
                  </Col>
                ))}
              </Row>
            </NavDropdown>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <SearchBar />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
