import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddProductDelivery = ({ setAddPopUp }) => {
  const [errMsg, setErrMsg] = useState("");

  const [vehicleData, setVehicleData] = useState([]);
  const [driverData, setDriverData] = useState([]);

  const initialState = {
    product_name: "",
    product_price: "",
    vehicle_no: "",
    license_no: "",
    dispatch_add: "",
    del_add: "",
    del_distance: "",
  };

  const [formInput, setFormInput] = useState({
    product_name: "",
    product_price: "",
    vehicle_no: "",
    license_no: "",
    dispatch_add: "",
    del_add: "",
    del_distance: "",
  });

  useMemo(() => { }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/add-delivery";
    try {
      const { data } = await axios.post(url, formInput);
      console.log(data);
      if (data.success) {
        setFormInput(initialState);
        // navigate("/product-delivery/view")
        toast.success(data.message, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      setErrMsg(error.response.data.message);
      setTimeout(() => {
        setErrMsg("");
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <Fragment>
      <div className="add_popup">
        <Container className="mt-5 add_container">
          <span className="error">{errMsg}</span>
          <div
            className="d-flex add_head"
            style={{
              width: "100%",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <h4 className="add_head">Add Delivery Details</h4>
          </div>
          <Form  onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="form_label">Product Name</Form.Label>
              <Form.Control
                name="product_name"
                value={formInput.product_name}
                placeholder="product name"
                type="text"
                className="form_control"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group >
              <Form.Label className="form_label">Product Price</Form.Label>
              <Form.Control
                name="product_price"
                value={formInput.product_price}
                placeholder="product price"
                type="number"
                className="form_control"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Vehicle</Form.Label>
              <Form.Select
                name="vehicle_no"
                value={formInput.vehicle_no}
                className="form_control"
                onChange={handleChange}
              >
                <option>Select vehicle</option>
                {vehicleData &&
                  vehicleData.map((obj) => {
                    return (
                      <>
                        <optgroup key={obj.vehicle_no} label={obj.vehicle_name}>
                          <option value={obj.vehicle_no}>
                            {obj.vehicle_no}
                          </option>
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
                value={formInput.license_no}
              >
                <option>Select Driver</option>
                {driverData &&
                  driverData.map((obj) => {
                    return (
                      <>
                        <optgroup key={obj.license_no} label={obj.name}>
                          <option value={obj.license_no}>
                            {obj.license_no}
                          </option>
                        </optgroup>
                      </>
                    );
                  })}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Dispatch Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="dispatch address"
                className="form_control"
                onChange={handleChange}
                name="dispatch_add"
                value={formInput.dispatch_add}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form_label">Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="delivery address"
                type="text"
                className="form_control"
                onChange={handleChange}
                name="del_add"
                value={formInput.del_add}
              />
            </Form.Group>
            <Form.Group >
              <Form.Label className="form_label">Delivery Address</Form.Label>
              <Form.Control
                placeholder="distance"
                type="text"
                className="form_control"
                onChange={handleChange}
                name="del_distance"
                value={formInput.del_distance}
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
                Add
              </button>
              <button
                className="closeBtn"
                onClick={() => setAddPopUp((prev) => !prev)}
              >
                close
              </button>
            </Form.Group>
          </Form>
        </Container>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
};

export default AddProductDelivery;
