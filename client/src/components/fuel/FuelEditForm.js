import axios from "axios";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const FuelEditForm = ({ dataInput, handleChange, handleCancel }) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5000/api/vehicle-driver";
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
          name="vehicle_no"
          value={dataInput.vehicle_no}
          className="form_control"
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
        <Form.Label className="form_label">Fill Date</Form.Label>
        <Form.Control
          type="date"
          onChange={handleChange}
          name="fuel_fill_date"
          value={moment(dataInput.fuel_fill_date)
            .utc(true)
            .format("YYYY-MM-DD")}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Quantity</Form.Label>
        <Form.Control
          placeholder="Enter quantity"
          name="quantity"
          value={dataInput.quantity}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Price</Form.Label>
        <Form.Control
          placeholder="Enter price"
          name="fuel_total_price"
          value={dataInput.fuel_total_price}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Filled By</Form.Label>
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
        <Form.Label>Odometer</Form.Label>
        <Form.Control
          placeholder="Enter odometer reading"
          name="odometer"
          value={dataInput.odometer}
          onChange={handleChange}
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

export default FuelEditForm;
