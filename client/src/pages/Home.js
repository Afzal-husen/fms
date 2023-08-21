import React, { Fragment, useState } from "react";
import Card from "../components/Card.js";
import Aside from "../components/Aside.js";
import Header from "../components/Header.js";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <Fragment>
      {/* <Layout /> */}
      <div className="aside_view">
        <Aside
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />
        <div className="header_aside">
          <Header />
          <div
            className="cards"
            style={
              isSideBarOpen
                ? { width: "80vw", transition: "0.6s ease-in-out all" }
                : { width: "94vw", transition: "0.6s ease-in-out all" }
            }
          >
            <Card
              url={"http://localhost:5000/api/vehicle/vehicle-details"}
              type={"vehicles"}
              theme={"#dc143c"}
            />
            <Card
              url={"http://localhost:5000/api/driver/driver-details"}
              type={"drivers"}
              theme={"#525FE1"}
            />
            <Card
              url={"http://localhost:5000/api/fuel/fuel-details"}
              type={"fuel"}
              theme={"#FFB84C"}
              cost={"expense"}
            />
            <Card
              url={"http://localhost:5000/api/fetch-delivery_data"}
              type={"Delivery"}
              theme={"#6DA9E4"}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
