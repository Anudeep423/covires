import React from "react";
import { Dropdown } from "react-bootstrap";

const Suggestions = (props) => {
  const options = props.results.map((r) => <li key={r.id}>{r.Name}</li>);
  return <Dropdown.Item>{options}</Dropdown.Item>;
};

export default Suggestions;
