import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const DeliveryEditForm = ({ dataInput, handleChange, handleCancel }) => {
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
        <Form.Label className="form_label">Name</Form.Label>
        <Form.Control
          name="product_name"
          value={dataInput.product_name}
          placeholder="enter product name..."
          type="text"
          className="form_control"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="form_label">Price</Form.Label>
        <Form.Control
          name="product_price"
          value={dataInput.product_price}
          placeholder="enter product price..."
          type="number"
          className="form_control"
          onChange={handleChange}
        />
      </Form.Group>
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
        <Form.Label className="form_label">Dispatch Addr.</Form.Label>
        <Form.Control
          placeholder="enter dispatch address..."
          type="text"
          className="form_control"
          onChange={handleChange}
          name="dispatch_add"
          value={dataInput.dispatch_add}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Delivery Addr.</Form.Label>
        <Form.Control
          placeholder="enter delivery address..."
          type="text"
          className="form_control"
          onChange={handleChange}
          name="del_add"
          value={dataInput.del_add}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="form_label">Distance</Form.Label>
        <Form.Control
          placeholder="enter distance..."
          type="text"
          className="form_control"
          onChange={handleChange}
          name="del_distance"
          value={dataInput.del_distance}
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

export default DeliveryEditForm;
