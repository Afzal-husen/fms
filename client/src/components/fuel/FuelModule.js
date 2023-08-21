import React, { Fragment, useState } from "react";
import { Nav, Container } from "react-bootstrap";
import { caretDown, caretLeft, gas } from "../../utils/icons.js";
import { useNavigate, useLocation } from "react-router-dom";
import SideBarLinkTitle from "../SideBarLinkTitle.js";
import SubModule from "../SubModule.js";

const FuelModule = ({ isSideBarOpen }) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const navigate = useNavigate();

  const location = useLocation().pathname;

  return (
    <Fragment>
      {isSideBarOpen && (
        <Nav className="module_nav">
          <SideBarLinkTitle
            isDropDown={isDropDown}
            setIsDropDown={setIsDropDown}
            title="Fuel"
            icon={gas}
            caretDown={caretDown}
            caretLeft={caretLeft}
          />
          {isDropDown && (
            <Fragment>
              <Container>
                <SubModule
                  location={location}
                  navigate={navigate}
                  path="/fuel/view"
                  subtitle="Fuel info"
                />
              </Container>
            </Fragment>
          )}
        </Nav>
      )}
    </Fragment>
  );
};

export default FuelModule;
