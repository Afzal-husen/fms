import React, { Fragment, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import SideBarLinkTitle from "../SideBarLinkTitle";
import SubModule from "../SubModule";
import { caretDown, caretLeft, dollar } from "../../utils/icons";
import { useLocation, useNavigate } from "react-router-dom";

const IncomeExpense = ({ isSideBarOpen }) => {
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
            title="income-expense"
            icon={dollar}
            caretDown={caretDown}
            caretLeft={caretLeft}
          />
          {isDropDown && (
            <Fragment>
              <Container>
                <SubModule
                  location={location}
                  navigate={navigate}
                  path="/income-expense/view"
                  subtitle="income-expense info"
                />
              </Container>
            </Fragment>
          )}
        </Nav>
      )}
    </Fragment>
  );
};

export default IncomeExpense;
