import React, { Fragment, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import SideBarLinkTitle from "../SideBarLinkTitle";
import SubModule from "../SubModule";
import { caretDown, caretLeft, delivery } from "../../utils/icons";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDeliveryModule = ({ isSideBarOpen }) => {
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
            title="product delivery"
            icon={delivery}
            caretDown={caretDown}
            caretLeft={caretLeft}
          />
          {isDropDown && (
            <Fragment>
              <Container>
                <SubModule
                  location={location}
                  navigate={navigate}
                  path="/product-delivery/view"
                  subtitle="delivery detail"
                />
              </Container>
            </Fragment>
          )}
        </Nav>
      )}
    </Fragment>
  );
};

export default ProductDeliveryModule;
