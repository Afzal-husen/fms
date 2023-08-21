import React, { Fragment } from "react";
import { Nav, NavLink } from "react-bootstrap";

const SubModule = ({ location, navigate, path, subtitle }) => {
  return (
    <Fragment>
      <Nav.Item className="module_item">
        <NavLink
          style={
            location !== path
              ? { color: "#fff", opacity: 0.7 }
              : {
                  backgroundColor: "#fff",
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                  color: "#000",
                  opacity: 0.7,
                }
          }
          onClick={() => navigate(path)}
          className="submodule_title"
        >
          {subtitle}
        </NavLink>
      </Nav.Item>
    </Fragment>
  );
};

export default SubModule;
