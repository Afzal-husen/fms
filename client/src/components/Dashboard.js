import React, { Fragment } from "react";
import { Nav, NavLink } from "react-bootstrap";
import { dashboard } from "../utils/icons.js";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ isSideBarOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      {isSideBarOpen && (
        <Nav className="module_nav">
          <Nav.Item
            className="mb-3 rounded hover-sidebar-links"
            onClick={() => navigate("/")}
          >
            <NavLink
              style={{
                color: "#fff",
                opacity: 0.7,
                display: "flex",
                gap: "1.2rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="d-flex gap-3 icon_title">
                <span style={{ fontSize: "1.2rem" }}>{dashboard}</span>
                <span style={{ fontSize: "1.2rem" }}>Dashboard</span>
              </div>
            </NavLink>
          </Nav.Item>
        </Nav>
      )}
    </Fragment>
  );
};

export default Dashboard;
