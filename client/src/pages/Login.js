import React, { Fragment, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const url = "http://localhost:5000/api/login";
      try {
        const { data } = await axios.post(
          url,
          {
            email: inputData.email,
            password: inputData.password,
          },
          { withCredentials: true }
        );

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
            navigate("/");
          }, 1200);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 700,
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
      <Container className="login_container p-4">
        <h1>Login</h1>
        <Form onSubmit={handleLogin} validated={validated}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              //   autoComplete="off"
              type="email"
              placeholder="Enter email..."
              name="email"
              onChange={handleChange}
              style={{
                backgroundColor: "#ececec",
                border: "none",
              }}
            />
            <Form.Control.Feedback>looks good</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password..."
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
              Login
            </Button>
          </Container>
        </Form>
      </Container>
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

export default Login;
