import React, { Fragment, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const url = "http://localhost:5000/api/register";
      try {
        const { data } = await axios.post(url, {
          username: inputData.username,
          email: inputData.email,
          password: inputData.password,
        });
        if (data.success) {
          setValidated(true);
          toast.success(data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1200);
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };
  return (
    <Fragment>
      <Container
        style={{
          boxShadow: " 0.1px 0.1px 5px  #bbbbbb",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
        className="w-auto w-lg-100 p-5"
        fluid
      >
        <h1
          style={{
            color: "#243040",
            fontWeight: "700",
            backgroundColor: "#ececec",
            padding: "1rem",
            textAlign: "center",
            marginBottom: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          Register
        </h1>
        <Form onSubmit={handleRegister} validated={validated}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username..."
              name="username"
              onChange={handleChange}
              style={{
                width: "300px",
                backgroundColor: "#ececec",
                border: "none",
              }}
            />
            <Form.Control.Feedback>looks good</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email..."
              name="email"
              onChange={handleChange}
              style={{
                width: "300px",
                backgroundColor: "#ececec",
                border: "none",
              }}
            />
            <Form.Control.Feedback>looks good</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password.."
              name="password"
              onChange={handleChange}
              style={{
                backgroundColor: "#ececec",
                border: "none",
              }}
            />
            <Form.Control.Feedback>looks good</Form.Control.Feedback>
          </Form.Group>

          <Container className="d-flex align-items-center p-0 gap-5">
            <Button
              variant="dark"
              type="submit"
              style={{
                width: "100%",
              }}
            >
              register
            </Button>
            <Link to={"/login"}>
              <Form.Text>login</Form.Text>
            </Link>
          </Container>
        </Form>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={1000}
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

export default Register;
