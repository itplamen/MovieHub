import {
  Button,
  CloseButton,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

import useLocalStorage from "@/hooks/useLocalStorage";
import React, { useState } from "react";
import styles from "./searchBar.module.css";
import { useRouter } from "next/router";
import constants from "@/data/constants.json";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        id={styles.RecentSearches}
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const SearchBar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState();
  const { data, saveData, removeData } = useLocalStorage(
    constants.STORAGE_KEYS.SEARCH
  );

  const handleSearch = () => {
    setSearchValue("");
    setIsVisible(false);
    saveData({ tag: searchValue });
    router.push(`/search/${searchValue}`);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        handleSearch();
        break;
      case "Escape":
        handleToggle(false);
        break;
    }
  };

  const handleToggle = (show) => {
    setIsVisible(show);
  };

  return (
    <Dropdown id={styles.SearchBar} show={isVisible} onToggle={handleToggle}>
      <Dropdown.Toggle as={CustomToggle}>
        <InputGroup style={{ width: "20rem" }}>
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="Search"
            value={searchValue}
            maxLength={20}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="warning" onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup>
      </Dropdown.Toggle>
      {data && data.length > 0 && (
        <Dropdown.Menu as={CustomMenu} style={{ width: "20rem" }}>
          <Dropdown.Item disabled eventKey={-1} id={styles.RecentSearchesText}>
            Recent Searches
          </Dropdown.Item>
          <Dropdown.Divider />
          {data.map((x, i) => (
            <Dropdown.Item key={x.tag} eventKey={i} active={false}>
              <Row>
                <Col md={10}>
                  <div onClick={() => router.push(`/search/${x.tag}`)}>
                    {x.tag}
                  </div>
                </Col>
                <Col md={2}>
                  <CloseButton
                    className="btn btn-dark"
                    value={x.tag}
                    onClick={(event) => removeData({ tag: event.target.value })}
                  />
                </Col>
              </Row>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default SearchBar;
