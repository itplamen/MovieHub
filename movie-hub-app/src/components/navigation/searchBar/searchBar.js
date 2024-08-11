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
import Link from "next/link";
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
  const { data, saveData, removeData } = useLocalStorage(
    constants.STORAGE_KEYS.SEARCH
  );

  const handleSearch = () => {
    saveData({ value: searchValue });
    router.push(`/search/${searchValue}`);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <InputGroup style={{ width: "20rem" }}>
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <Button variant="warning" onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup>
      </Dropdown.Toggle>
      {data && data.length > 0 && (
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item disabled eventKey={-1} id={styles.RecentSearchesText}>
            Recent Searches
          </Dropdown.Item>
          <Dropdown.Divider />
          {data.map((x, i) => (
            <Dropdown.Item eventKey={i} active={false}>
              <Row>
                <Col md={10}>
                  <Link href={`/search/${x.value}`}>{x.value}</Link>
                </Col>
                <Col md={2}>
                  <CloseButton
                    className="btn btn-dark"
                    value={x.value}
                    onClick={(event) => removeData(event.target.value)}
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
