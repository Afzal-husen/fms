import React, { Fragment, useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import VehicleEditForm from "./vehicle/VehicleEditForm.js";
import DriverEditForm from "./driver/DriverEditForm.js";
import FuelEditForm from "./fuel/FuelEditForm.js";
import FinanceEditForm from "./incomeExpense/FinanceEditForm.js";
import DeliveryEditForm from "./productDelivery/DeliveryEditForm.js";

const EditPopup = ({
  data,
  dataInput,
  setDataInput,
  url,
  type,
  setId,
  setHide,
  setHasBeenClicked,
  fileInput,
  setFileInput,
}) => {
  const [errMsg, setErrMsg] = useState("");
  const [notAllowed, setNotAllowed] = useState("");



  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (type === "vehicle") {
      const vehicleName = dataInput.vehicle_name;
      const vehicleNo = dataInput.vehicle_no;
      const vehicleType = dataInput.vehicle_type;
      const vehicleModel = dataInput.vehicle_model;
      const engineNo = dataInput.engine_no;
      const chassisNo = dataInput.chassis_no;

    fileInput && formData.append("vehicleEditImage", fileInput, fileInput.name);
    formData.append("vehicle_name", vehicleName);
    formData.append("vehicle_no", vehicleNo);
    formData.append("vehicle_type", vehicleType);
    formData.append("vehicle_model", vehicleModel);
    formData.append("engine_no", engineNo);
    formData.append("chassis_no", chassisNo);
    setFileInput("")
    }
    setHasBeenClicked((prev) => !prev);
    
    try {
      const { data } = await axios.patch(url, formData);
      if (data.success) {
        setId("");
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      // setTimeout(() => {
      //   setErrMsg("");
      // }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataInput((prevValue) => {
      return { ...prevValue, [name]: value };
    });
    if (e.target.files !== null) {
      setFileInput(e.target.files[0]);

      if (e.target.files && e.target.files[0].size > 2000000) {
        setFileInput(e.target.files[0]);
        setNotAllowed("File Cannot Exceed 2mb");
        setTimeout(() => {
          setNotAllowed("");
          setFileInput("");
        }, 1500);
      } else {
        setFileInput(e.target.files[0]);
      }
    } 
  };

  const handleCancel = () => {
    setId("");
    setHide((prev) => !prev);
    setFileInput("")
  };
  return (
    <Fragment>
      <Container fluid className="add_popup">
        <Container fluid className="mt-5 add_container">
          <span className="error">{errMsg}</span>
          <h4 className="add_head">Edit </h4>
          <Form onSubmit={handleEditSubmit}>
            {type === "vehicle" ? (
              <VehicleEditForm
                dataInput={dataInput}
                handleChange={handleChange}
                handleCancel={handleCancel}
                fileInput={fileInput}
                setFileInput={setFileInput}
                data={data}
                notAllowed={notAllowed}
              />
            ) : type === "driver" ? (
              <DriverEditForm
                dataInput={dataInput}
                handleChange={handleChange}
                handleCancel={handleCancel}
              />
            ) : type === "fuel" ? (
              <FuelEditForm
                dataInput={dataInput}
                handleChange={handleChange}
                handleCancel={handleCancel}
              />
            ) : type === "finance" ? (
              <FinanceEditForm
                dataInput={dataInput}
                handleChange={handleChange}
                handleCancel={handleCancel}
              />
            ) : (
              <DeliveryEditForm
                dataInput={dataInput}
                handleChange={handleChange}
                handleCancel={handleCancel}
              />
            )}
          </Form>
        </Container>
      </Container>
    </Fragment>
  );
};

export default EditPopup;
