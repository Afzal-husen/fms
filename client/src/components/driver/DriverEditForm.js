import moment from "moment";
import React, { Fragment } from "react";
import {Form } from "react-bootstrap";

const DriverEditForm = ({ dataInput, handleChange, handleCancel }) => {
  return (
    <Fragment>
      <Form.Group>
        <Form.Label className="form_label">Name</Form.Label>
        <Form.Control
          placeholder="Enter Name"
          name="name"
          value={dataInput.name}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Mobile No.</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter mobile"
          name="mobile"
          value={dataInput.mobile}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">License No.</Form.Label>
        <Form.Control
          placeholder="Enter license no"
          name="license_no"
          value={dataInput.license_no}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">License Expiry</Form.Label>
        <Form.Control
          type="date"
          onChange={handleChange}
          name="license_exp"
          value={moment(dataInput.license_exp).utc(true).format("YYYY-MM-DD")}
          className="form_control"
        />
      </Form.Group>

      <Form.Group
        className="mt-3"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.5rem",
        }}
      >
        <button className="add_btn" type="submit">
          Edit
        </button>
        <button className="closeBtn" onClick={handleCancel}>
          close
        </button>
      </Form.Group>
    </Fragment>
  );
};

export default DriverEditForm;
