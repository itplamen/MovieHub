import { useState } from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./translation.module.css";

const Translation = ({
  selectedLanguage,
  setSelectedLanguage,
  translations,
}) => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleSelect = (eventKey, event) => {
    setSelectedLanguage(eventKey, event.target.name);
    setSearch("");
  };

  return (
    <section className={styles.language}>
      <Dropdown drop="down-centered" onSelect={handleSelect}>
        <Dropdown.Toggle variant="primary" id="language">
          {selectedLanguage.code.toUpperCase()}
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.scrollableMenu}>
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={handleChange}
            value={search}
          />
          <Dropdown.Divider />
          {translations
            .filter((x) => {
              if (!search) {
                return x;
              } else {
                return (
                  x.iso_3166_1.toLowerCase().includes(search) ||
                  x.iso_639_1.toLowerCase().includes(search) ||
                  x.english_name.toLowerCase().includes(search) ||
                  x.name.toLowerCase().includes(search)
                );
              }
            })
            .map((x) => (
              <Dropdown.Item
                key={`${x.iso_639_1}_${x.iso_3166_1}`}
                eventKey={x.iso_3166_1}
                name={x.iso_639_1}
                active={
                  x.iso_3166_1 === selectedLanguage.key &&
                  x.iso_639_1 === selectedLanguage.code
                }
              >
                {x.english_name} ({x.iso_639_1}-{x.iso_3166_1})
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </section>
  );
};

export default Translation;
