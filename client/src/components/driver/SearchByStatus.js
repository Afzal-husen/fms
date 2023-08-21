import React, { Fragment } from "react";
import { Container, Form } from "react-bootstrap";

const SearchByStatus = ({ cbFunc }) => {
  return (
    <Fragment>
      <Container
        style={{
          padding: 0
        }}
      >
        <Form>
          <Form.Select className="form_label" onChange={cbFunc}>
            <option>All drivers</option>
            <option>Active</option>
            <option>InActive</option>
          </Form.Select>
        </Form>
      </Container>
    </Fragment>
  );
};

export default SearchByStatus;
