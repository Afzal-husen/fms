import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import { cancel } from "../../utils/icons";

const VehicleEditForm = ({
  dataInput,
  handleChange,
  handleCancel,
  fileInput,
  setFileInput,
  data,
  notAllowed
}) => {
  return (
    <Fragment>
      <Form.Group>
        <Form.Label className="form_label">Vehicle Name</Form.Label>
        <Form.Control
          placeholder="Enter Vehicle Name"
          name="vehicle_name"
          value={dataInput.vehicle_name}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Vehicle No</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Vehicle No"
          name="vehicle_no"
          value={dataInput.vehicle_no}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Vehicle Type</Form.Label>
        <Form.Select
          value={dataInput.vehicle_type}
          name="vehicle_type"
          onChange={handleChange}
          className="form_control"
        >
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
          placeholder="Enter Vehicle Model"
          name="vehicle_model"
          value={dataInput.vehicle_model}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Engine No</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Engine No"
          name="engine_no"
          value={dataInput.engine_no}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="form_label">Chassis No</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Chassis No"
          name="chassis_no"
          value={dataInput.chassis_no}
          onChange={handleChange}
          className="form_control"
        />
      </Form.Group>

      <Form.Group style={{ position: "relative" }}>
        <Form.Label className="form_label">Select Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          name="vehicleEditImage"
          onChange={handleChange}
          className="form_control"
          style={
            fileInput || (data.image_url && !fileInput) ? { width: "85%" } : {}
          }
        />
        {fileInput &&
          (fileInput.type === "image/jpg" ||
            fileInput.type === "image/jpeg" ||
            fileInput.type === "image/png" ||
            fileInput.type === "image/webp" ||
            fileInput.type === "image/svg") && (
            <Fragment>
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
              <span className="cancel" onClick={() => setFileInput("")}>
                {cancel}
              </span>
            </Fragment>
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
        {data.image_url && !fileInput && (
          <img
            className="image"
            style={{
              width: "4rem",
              height: "4rem",
              position: "absolute",
              right: 0,
              top: "0.5rem",
            }}
            src={data.image_url}
            alt=""
          />
        )}
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

export default VehicleEditForm;
