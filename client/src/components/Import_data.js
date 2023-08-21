import React, { Fragment, useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";

const ImportData = ({
  setIsPopUp,
  setNoDetail,
  url,
  fieldName,
  isSideBarOpen,
}) => {
  const [fileInput, setFileInput] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFileImport = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(fieldName, fileInput, fileInput.name);
      const { data } = await axios.post(url, formData);
      if (data.success) {
        setIsPopUp((prev) => !prev);
        setNoDetail((prev) => !prev);
      }
    } catch (error) {
      console.error(error.message);
      setErrMsg("please choose a file");
      setTimeout(() => {
        setErrMsg("");
      }, 1000);
    }
  };
  return (
    <Fragment>
      <Container
        className="import_popup_container p-0"
        style={
          isSideBarOpen
            ? { width: "100%", transition: "0.6s ease-in-out all" }
            : { width: "82vw", transition: "0.6s ease-in-out all" }
        }>
        <Form
          className="import_popup_wrapper"
          onSubmit={handleFileImport}
          encType="multipart/form-data">
          <span className="error_file">{errMsg}</span>
          <h4>Select a File</h4>
          <Form.Control
            type="file"
            className="form_control"
            name={fieldName}
            accept=".csv"
            onChange={(e) => setFileInput(e.target.files[0])}
            style={{ marginTop: "1rem" }}
          />
          <Form.Group
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.5rem",
            }}>
            <button className="add_btn" type="submit">
              Add
            </button>
            <button
              className="closeBtn"
              onClick={() => setIsPopUp((prev) => !prev)}>
              close
            </button>
          </Form.Group>
        </Form>
      </Container>
    </Fragment>
  );
};

export default ImportData;
