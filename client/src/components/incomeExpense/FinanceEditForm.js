import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const FinanceEditForm = ({ dataInput, handleChange, handleCancel }) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5000/api/income-expense/vehicle-driver";
      try {
        const { data } = await axios.get(url);
        if (data.success) {
          // for vehicle
          setVehicleData(data.data_vehicle);
          // for driver
          setDriverData(data.data_driver);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Form.Group>
        <Form.Label className="form_label">Vehicle</Form.Label>
        <Form.Select
          className="form_control"
          name="vehicle_no"
          value={dataInput.vehicle_no}
          onChange={handleChange}
        >
          <option>Select vehicle</option>
          {vehicleData &&
            vehicleData.map((obj) => {
              return (
                <>
                  <optgroup key={obj.vehicle_no} label={obj.vehicle_name}>
                    <option value={obj.vehicle_no}>{obj.vehicle_no}</option>
                  </optgroup>
                </>
              );
            })}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Driver</Form.Label>
        <Form.Select
          className="form_control"
          onChange={handleChange}
          name="license_no"
          value={dataInput.license_no}
        >
          <option>Select Driver</option>
          {driverData &&
            driverData.map((obj) => {
              return (
                <>
                  <optgroup key={obj.license_no} label={obj.name}>
                    <option value={obj.license_no}>{obj.license_no}</option>
                  </optgroup>
                </>
              );
            })}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Description</Form.Label>
        <Form.Control
          placeholder="Enter description"
          name="description"
          value={dataInput.description}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Amount</Form.Label>
        <Form.Control
          placeholder="Enter amount"
          name="amount"
          value={dataInput.amount}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
      <Form.Label className="form_label">Type</Form.Label>
        <Form.Select
          value={dataInput.type}
          name="type"
          onChange={handleChange}
          className="form_control"
        >
          <option>select type</option>
          <option value="income">income</option>
          <option value="expense">expense</option>
        </Form.Select>
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

export default FinanceEditForm;
