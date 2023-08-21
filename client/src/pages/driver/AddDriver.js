import React, { Fragment, useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDriver = ({ setAddPopUp }) => {
  const initialState = {
    name: "",
    mobile: "",
    license_no: "",
    license_exp: "",
  };
  const [driverInput, setDriverInput] = useState({
    name: "",
    mobile: "",
    license_no: "",
    license_exp: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  // handleOnchange
  const handleChange = (e) => {
    const { value, name } = e.target;
    setDriverInput((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  // add
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/driver/add-driver";
    try {
      const { data } = await axios.post(url, driverInput);
      if (data.success) {
        setDriverInput(initialState);
        navigate("/driver/view");
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
            <h4 className="add_head">Add Driver Details</h4>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="form_label">Name</Form.Label>
              <Form.Control
                placeholder="driver name"
                name="name"
                value={driverInput.name}
                onChange={handleChange}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="mobile no."
                name="mobile"
                value={driverInput.mobile}
                onChange={handleChange}
                style={{
                  backgroundColor: "#ececec",
                  border: "none",
                }}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">License no</Form.Label>
              <Form.Control
                type="text"
                placeholder="license no"
                name="license_no"
                value={driverInput.license_no}
                onChange={handleChange}
                style={{
                  backgroundColor: "#ececec",
                  border: "none",
                }}
                className="form_control"
              />
            </Form.Group>

            {/* license expiry date */}
            <Form.Group>
              <Form.Label className="form_label">License expiry</Form.Label>
              <Form.Control
                type="date"
                onChange={handleChange}
                name="license_exp"
                value={driverInput.license_exp}
                // value={"2017-09-27"}
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
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
};

export default AddDriver;
