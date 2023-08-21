import React, { Fragment, useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer } from "react-toastify";
// import { cancel, cancelCircle, save } from "../../utils/icons";

const AddVehicle = ({ setAddPopUp, setHasBeenClicked }) => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNo, setVehcileNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [engineNo, setEngineNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");

  const [fileInput, setFileInput] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [notAllowed, setNotAllowed] = useState("");

  console.log(fileInput);

  // add
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/vehicle/add-vehicle";
    try {
      const formData = new FormData();
      fileInput && formData.append("vehicleImage", fileInput, fileInput.name);
      formData.append("vehicle_name", vehicleName);
      formData.append("vehicle_no", vehicleNo);
      formData.append("vehicle_type", vehicleType);
      formData.append("vehicle_model", vehicleModel);
      formData.append("engine_no", engineNo);
      formData.append("chassis_no", chassisNo);
      const { data } = await axios.post(url, formData);
      if (data.success) {
        // navigate("/vehicle/view");
        setAddPopUp((prev) => !prev);
        setHasBeenClicked((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
      setErrMsg(error.response.data.message);
      setTimeout(() => {
        setErrMsg("");
      }, 1000);
    }
  };

  const handleFileChange = (e) => {
    if (
      e.target.files[0].size !== undefined &&
      e.target.files[0].size > 2000000
    ) {
      setFileInput(e.target.files[0]);
      setNotAllowed("File Cannot Exceed 2mb");
      setTimeout(() => {
        setNotAllowed("");
        setFileInput("");
      }, 1500);
    } else {
      setFileInput(e.target.files[0]);
    }
  };

  return (
    <Fragment>
      <div className="add_popup">
        <Container className="mt-5  add_container" fluid>
          {/* <button style={{background: "transparent", borderRadius: "100%", position: "absolute", right: "1rem", top: "1rem"}}>{cancel}</button> */}
          <span className="error">{errMsg}</span>
          <div
            className="d-flex add_head"
            style={{
              width: "100%",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <h4 className="add_head">Add Vehicle Details</h4>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="form_label">Vehicle Name</Form.Label>
              <Form.Control
                placeholder="vehicle name"
                name="vehicle_name"
                onChange={(e) => setVehicleName(e.target.value)}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Vehicle No</Form.Label>
              <Form.Control
                type="number"
                placeholder="vehicle no."
                name="vehicle_no"
                onChange={(e) => setVehcileNo(e.target.value)}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Vehicle Type</Form.Label>
              <Form.Select
                name="vehicle_type"
                onChange={(e) => setVehicleType(e.target.value)}
                className="form_control"
              >
                <option>Select vehicle type</option>
                <option value="car">car</option>
                <option value="motor cycle">motor cycle</option>
                <option value="truck">truck</option>
                <option value="bus">bus</option>
                <option value="taxi">taxi</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Vehicle Model</Form.Label>
              <Form.Control
                placeholder="vehicle model"
                name="vehicle_model"
                onChange={(e) => setVehicleModel(e.target.value)}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Engine No</Form.Label>
              <Form.Control
                type="number"
                placeholder="engine no."
                name="engine_no"
                onChange={(e) => setEngineNo(e.target.value)}
                className="form_control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form_label">Chassis No</Form.Label>
              <Form.Control
                type="number"
                placeholder="chassis no."
                name="chassis_no"
                onChange={(e) => setChassisNo(e.target.value)}
                className="form_control"
              />
            </Form.Group>
            {/* image */}
            <Form.Group style={{ position: "relative" }}>
              <Form.Label className="form_label">Select Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="vehicleImage"
                onChange={handleFileChange}
                className="form_control"
                style={fileInput ? { width: "85%" } : {}}
              />
              {fileInput &&
                (fileInput.type === "image/jpg" ||
                  fileInput.type === "image/jpeg" ||
                  fileInput.type === "image/png" ||
                  fileInput.type === "image/webp" ||
                  fileInput.type === "image/svg" ||
                  fileInput.type === "image/avif") && (
                  <img
                    className="image"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      position: "absolute",
                      right: 0,
                      top: "0.5rem",
                    }}
                    src={URL.createObjectURL(fileInput)}
                    alt={fileInput.name}
                  />
                )}
              <span
                className="error"
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "50%",
                }}
              >
                {notAllowed}
              </span>
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
                onClick={() => {
                  setAddPopUp((prev) => !prev);
                  setFileInput("");
                }}
              >
                close
              </button>
            </Form.Group>
            {/* <button style={{marginLeft: "40%",marginTop: "2rem"}} className="add_btn">Save {save}</button> */}
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

export default AddVehicle;
