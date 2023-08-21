import React, { Fragment, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { cancel } from "../../utils/icons";

const AddIncomeExpense = ({ setAddPopUp}) => {
  const [incomeExpenseInput, setIncomeExpenseInput] = useState({
    vehicle_no: "",
    license_no: "",
    description: "",
    amount: "",
    type: "",
  });
  console.log(incomeExpenseInput);

  const [vehicleData, setVehicleData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

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

  // handleOnchange
  const handleChange = (e) => {
    const { value, name } = e.target;
    setIncomeExpenseInput((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  // add
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/income-expense/add";
    try {
      const { data } = await axios.post(url, incomeExpenseInput);
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
        setIncomeExpenseInput({
          vehicle_no: "",
          license_no: "",
          description: "",
          amount: "",
          type: "",
        });
        // navigate("/income-expense/view");
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      setTimeout(() => {
        setErrMsg("");
      }, 1000);
    }
  };
  return (
    <Fragment>
      <div className="add_popup">
        <Container className="mt-5  add_container" fluid>
        <span className="error">{errMsg}</span>
          <div
            className="d-flex add_head"
            style={{
              width: "100%",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <h4 className="add_head">Add Details</h4>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="form_label">Vehicle</Form.Label>
              <Form.Select
                className="form_control"
                name="vehicle_no"
                value={incomeExpenseInput.vehicle_no}
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
                value={incomeExpenseInput.license_no}
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
              <Form.Label className="form_label">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                name="description"
                value={incomeExpenseInput.description}
                onChange={handleChange}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Amount (L)</Form.Label>
              <Form.Control
                placeholder="amount"
                name="amount"
                value={incomeExpenseInput.amount}
                onChange={handleChange}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Type</Form.Label>
              <Form.Select
                value={incomeExpenseInput.type}
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

export default AddIncomeExpense;
