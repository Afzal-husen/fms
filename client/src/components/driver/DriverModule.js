import React, { Fragment, useState } from "react";
import { Nav, Container } from "react-bootstrap";
import { caretDown, driver, caretLeft } from "../../utils/icons.js";
import { useNavigate, useLocation } from "react-router-dom";
import SideBarLinkTitle from "../SideBarLinkTitle.js";
import SubModule from "../SubModule.js";

const DriverModule = ({ isSideBarOpen }) => {
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
            title="Driver"
            icon={driver}
            caretDown={caretDown}
            caretLeft={caretLeft}
          />
          {isDropDown && (
            <Fragment>
              <Container>
                <SubModule
                  location={location}
                  navigate={navigate}
                  path="/driver/view"
                  subtitle="Driver List"
                />
              </Container>
            </Fragment>
          )}
        </Nav>
      )}
    </Fragment>
  );
};

export default DriverModule;
