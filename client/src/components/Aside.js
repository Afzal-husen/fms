import React, { useRef } from "react";
import "../styles/aside.css";
import { cancel, menuIcon } from "../utils/icons";
import VehicleModule from "./vehicle/VehicleModule";
import Dashboard from "./Dashboard";
import DriverModule from "./driver/DriverModule";
import FuelModule from "./fuel/FuelModule";
import IncomeExpense from "./incomeExpense/IncomeExpenseModule";
import ProductDeliveryModule from "./productDelivery/ProductDeliveryModule";

const Aside = ({ setIsSideBarOpen, isSideBarOpen }) => {
  const elRef = useRef();

  const handleClick = () => {
    elRef.current.classList.toggle("active_aside");
    setIsSideBarOpen((prev) => !prev);
  };
  return (
    <div ref={elRef} className="aside_container">
      <span className="menu_icon" onClick={handleClick}>
        {menuIcon}
      </span>
      <span className="menu_icon x_mark" onClick={handleClick}>
        {cancel}
      </span>
      <div  
      style={{ marginTop: "5rem" }}>
        <Dashboard isSideBarOpen={isSideBarOpen} />
        <VehicleModule isSideBarOpen={isSideBarOpen} />
        <DriverModule isSideBarOpen={isSideBarOpen} />
        <FuelModule isSideBarOpen={isSideBarOpen} />
        <IncomeExpense isSideBarOpen={isSideBarOpen} />
        <ProductDeliveryModule isSideBarOpen={isSideBarOpen} />
      </div>
    </div>
  );
};

export default Aside;
