import { FloatingLabel, Form } from "react-bootstrap";

const Option = ({ value, label, handleChange, children }) => {
  return (
    <FloatingLabel controlId={`${label}Select`} label={label}>
      <Form.Select
        size="sm"
        value={value}
        aria-label={`Movie ${label} Label`}
        onChange={handleChange}
      >
        {children}
      </Form.Select>
    </FloatingLabel>
  );
};

export default Option;
