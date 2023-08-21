import React, { Fragment, useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const url = "http://localhost:5000/api/logout";
      const { data } = await axios.get(url, { withCredentials: true });
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = "http://localhost:5000/api";
        const { data } = await axios.get(url, { withCredentials: true });
        if (data.success) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error(error)
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);
  return (
    <Fragment>
      <Navbar className="navbar">
        <Container fluid>
          <Navbar.Brand
            className="ms-5 navbar_brand"
            onClick={() => navigate("/")}
          >
            Dashboard
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center gap-2 nav_">
            <span>{userData.username}</span>
            <Nav.Link className="nav_link" onClick={handleLogout}>
              <FontAwesomeIcon style={{fontSize: "1.2rem"}} icon={faCircleUser}/>
              <span>logout</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
