import React, { Fragment, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddFuel = ({ setAddPopUp }) => {
  const initialState = {
    vehicle_no: "",
    license_no: "",
    fuel_fill_date: "",
    quantity: "",
    fuel_total_price: "",
    odometer: "",
  };
  const [fuelInput, setFuelInput] = useState({
    vehicle_no: "",
    license_no: "",
    fuel_fill_date: "",
    quantity: "",
    fuel_total_price: "",
    odometer: "",
  });

  console.log(fuelInput);

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


  // handleOnchange
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFuelInput((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  // add
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/fuel/add";
    try {
      const { data } = await axios.post(url, fuelInput);
      console.log(data);
      if (data.success) {
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
        setFuelInput(initialState);
        // navigate("/fuel/view");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
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
  };
  return (
    <Fragment>
      <div className="add_popup">
        <Container className="mt-5 add_container" fluid>
          <div
            className="d-flex add_head"
            style={{
              width: "100%",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <h4 className="add_head">Add Fuel Details</h4>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="form_label">Select Vehicle</Form.Label>
              <Form.Select
                name="vehicle_no"
                value={fuelInput.vehicle_no}
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
              <Form.Label className="form_label">Fill date</Form.Label>
              <Form.Control
                className="form_control"
                type="date"
                onChange={handleChange}
                name="fuel_fill_date"
                value={fuelInput.fuel_fill_date}
                // value={"2017-09-27"}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="quantity"
                name="quantity"
                value={fuelInput.quantity}
                onChange={handleChange}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Fuel Price</Form.Label>
              <Form.Control
                type="number"
                onChange={handleChange}
                name="fuel_total_price"
                placeholder="price"
                value={fuelInput.fuel_total_price}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Fuel Filled By</Form.Label>
              <Form.Select
                className="form_control"
                onChange={handleChange}
                name="license_no"
                value={fuelInput.license_no}
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
              <Form.Label className="form_label">Odometer</Form.Label>
              <Form.Control
                type="number"
                onChange={handleChange}
                placeholder="odometer..."
                name="odometer"
                value={fuelInput.odometer}
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

export default AddFuel;
