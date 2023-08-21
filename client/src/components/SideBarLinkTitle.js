import React, { Fragment } from "react";
import { Nav, NavLink } from "react-bootstrap";

const SideBarLinkTitle = (props) => {
  const { isDropDown, setIsDropDown, icon, caretLeft, caretDown, title} =
    props;
  return (
    <Fragment>
      <Nav.Item
        className="module_item"
        style={isDropDown ? { backgroundColor: "#0079FF" } : {}}
      >
        <NavLink
          className="module_link"
          onClick={() => setIsDropDown(!isDropDown)}
        >
          <div className="icon_title">
            <span>{icon}</span>
            <span>{title}</span>
          </div>
          <span className="caret" style={{ fontSize: "1.2rem" }}>
            {!isDropDown ? caretLeft : caretDown}
          </span>
        </NavLink>
      </Nav.Item>
    </Fragment>
  );
};

export default SideBarLinkTitle;
