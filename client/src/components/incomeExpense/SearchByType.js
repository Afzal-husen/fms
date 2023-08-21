import React, { Fragment } from "react";
import { Container, Form } from "react-bootstrap";

const SearchByType = ({cbFunc}) => {
  return (
    <Fragment>
      <Container
        style={{
          padding: 0,
        }}
      >
        <Form>
          <Form.Select className="form_label" onChange={cbFunc}>
            <option>type</option>
            <option>income</option>
            <option>expense</option>
          </Form.Select>
        </Form>
      </Container>
    </Fragment>
  );
};

export default SearchByType;
