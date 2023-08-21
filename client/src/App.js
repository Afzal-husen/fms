import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login.js";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";
import ViewDriver from "./pages/driver/ViewDriver.js";
import ViewFuel from "./pages/fuel/ViewFuel.js";
import ViewVehicles from "./pages/vehicle/ViewVehicles.js";
import ViewIncomeExpense from "./pages/incomeExpense/ViewIncomeExpense.js";
import "./styles/index.css"
import ViewProductDelivery from "./pages/productDelivery/ViewProductDelivery.js";

const App = () => {
  return (
    <Fragment>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vehicle/view" element={<ViewVehicles />} />
            <Route path="/driver/view" element={<ViewDriver />} />
            <Route path="/fuel/view" element={<ViewFuel />} />
            <Route path="/income-expense/view" element={<ViewIncomeExpense />} />
            <Route path="/product-delivery/view" element={<ViewProductDelivery />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Fragment>
  );
};

export default App;
