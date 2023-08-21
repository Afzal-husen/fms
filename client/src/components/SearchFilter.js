import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import { search } from "../utils/icons";

const SearchFilter = ({ placeholder, type, cbFunc, label }) => {
  return (
    <Fragment>
      <Form
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
        className="search_form">
        {type !== "text" && (
          <Form.Label
            className="form_label"
            style={{ position: "absolute", top: "-1.5rem" }}>
            {label}
          </Form.Label>
        )}
        <Form.Control
          placeholder={placeholder}
          type={type}
          onChange={cbFunc}
          className="form_label"
        />
        {type === "text" && (
          <span
            style={{
              backgroundColor: "#27374D",
              position: "absolute",
              padding: "0.3rem 0.6rem",
              right: "0",
              color: "#fff",
              borderRadius: "0 0.5rem 0.5rem 0",
            }}>
            {search}
          </span>
        )}
      </Form>
    </Fragment>
  );
};

export default SearchFilter;
