import React, { Fragment } from "react";
import { Container, Form } from "react-bootstrap";

const SearchByStatus = ({ cbFunc }) => {
  return (
    <Fragment>
      <Container
        style={{
          // width: "30vw",
          width: "100%",
          padding: 0,
        }}
      >
        <Form>
          <Form.Select className="form_label" onChange={cbFunc}>
            <option>All</option>
            <option>delivered</option>
            <option>not delivered</option>
          </Form.Select>
        </Form>
      </Container>
    </Fragment>
  );
};

export default SearchByStatus;
