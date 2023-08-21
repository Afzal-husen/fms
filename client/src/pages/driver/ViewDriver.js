import React, { Fragment, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import AddDriver from "./AddDriver.js";
import {
  trash,
  edit,
  fileDownload,
  fileImport,
  caretRight,
  caretLeft,
  addIcon,
} from "../../utils/icons.js";

import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import ReactPaginate from "react-paginate";
import SearchByStatus from "../../components/driver/SearchByStatus";
import ToggleSwitch from "../../components/ToggleSwitch.js";
import { CSVLink } from "react-csv";
import ImportData from "../../components/Import_data.js";
import Aside from "../../components/Aside";
import Header from "../../components/Header";
import SearchFilter from "../../components/SearchFilter.js";
import EditPopup from "../../components/EditPopup.js";

const ViewDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [id, setId] = useState("");
  const [numRows, setNumRows] = useState("");
  const [noDetail, setNoDetail] = useState("");
  const [currentDrivers, setCurrentDrivers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [driverOffSet, setDriverOffSet] = useState(0);
  const [hide, setHide] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [addPopup, setAddPopUp] = useState(false);

  const [driverInput, setDriverInput] = useState({
    name: "",
    mobile: "",
    license_no: "",
    license_exp: "",
  });

  const pages = Math.ceil(numRows / 5);
  const items = [];
  for (let i = 0; i < pages; i++) {
    items.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:5000/api/driver/driver-details`;
      try {
        const { data } = await axios.get(url);

        if (data.empty) {
          setFilteredData([]);
          setNoDetail(data.message);
        } else {
          setDrivers(data.drivers);
          setFilteredData(data.drivers);
          const { numRows } = data.numRows;
          setNumRows(parseInt(numRows));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [hasBeenClicked, isPopUpOpen]);

  useEffect(() => {
    const endOffSet = driverOffSet + 5;
    setCurrentDrivers(filteredData.slice(driverOffSet, endOffSet));
    setPageCount(Math.ceil(filteredData.length / 5));
  }, [filteredData, driverOffSet]);

  const filterData = (e) => {
    setFilteredData(
      drivers.filter((driver) => {
        if (driver.name.toLowerCase().includes(e.target.value)) {
          return driver.name.toLowerCase().includes(e.target.value);
        } else if (driver.license_no.includes(e.target.value)) {
          return driver.license_no.includes(e.target.value);
        } else {
          return driver.mobile.toString().includes(e.target.value);
        }
      })
    );
  };

  const handle_delete_vehicle_detail = async (id) => {
    const url = `http://localhost:5000/api/driver/delete-driver-detail/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleOnEdit = (data) => {
    setId(data.id);
    setHide(!hide);
    setDriverInput({
      name: data.name,
      mobile: data.mobile,
      license_no: data.license_no,
      license_exp: data.license_exp,
    });
  };

  const handleStatus = async (id) => {
    const url = `http://localhost:5000/api/driver//update-status/${id}`;
    try {
      await axios.patch(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 5) % filteredData.length;
    setDriverOffSet(newOffset);
  };

  const filter_by_status = (e) => {
    setFilteredData(
      drivers.filter((driver) => {
        if (e.target.value === "Active") {
          return driver.status.toString().includes("1");
        } else if (e.target.value === "All drivers") {
          return driver;
        } else {
          return driver.status.toString().includes("0");
        }
      })
    );
  };

  const filterData_by_license_date = (e) => {
    setFilteredData(
      drivers.filter((driver) => {
        const license_date = moment(driver.license_exp)
          .utc(true)
          .format("DD-MM-YY")
          .replace(/-/g, "/");
        return license_date.includes(
          moment(e.target.value).utc(true).format("DD-MM-YY").replace(/-/g, "/")
        );
      })
    );
  };

  const filterData_by_join_date = (e) => {
    setFilteredData(
      drivers.filter((driver) => {
        const join_date = moment(driver.joining_date)
          .utc(true)
          .format("DD-MM-YY")
          .replace(/-/g, "/");
        return join_date.includes(
          moment(e.target.value).utc(true).format("DD-MM-YY").replace(/-/g, "/")
        );
      })
    );
  };
  return (
    <Fragment>
      <div className="aside_view">
        <Aside
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />
        <div className="header_aside">
          <Header isSideBarOpen={isSideBarOpen} />
          <Container
            fluid
            className={
              isSideBarOpen
                ? "p-0 view_container active_sideBar"
                : "p-0 view_container deactive_sideBar"
            }
          >
            {/* search filters */}
            <div className="filters">
              <SearchFilter
                cbFunc={filterData}
                placeholder={"name"}
                type={"text"}
              />
              <SearchFilter
                cbFunc={filterData}
                placeholder={"mobile"}
                type={"text"}
              />
              <SearchFilter
                cbFunc={filterData}
                placeholder={"license no"}
                type={"text"}
              />
              <SearchFilter
                cbFunc={filterData_by_license_date}
                label={"License Exp Date:"}
                type={"date"}
              />
              <SearchFilter
                cbFunc={filterData_by_join_date}
                label={"Joining Date:"}
                type={"date"}
              />
              <SearchByStatus cbFunc={filter_by_status} />
            </div>

            {/*import export btn */}
            <div className="import_export">
              <button
                className="export"
                onClick={() => setIsPopUp(!isPopUpOpen)}
              >
                Import {fileImport}
              </button>
              <div>
                {filteredData.length === drivers.length ? (
                  <CSVLink
                    data={drivers}
                    filename="driverData"
                    style={
                      currentDrivers.length === 0 ? { display: "none" } : {}
                    }
                  >
                    <button className="export">Export {fileDownload}</button>
                  </CSVLink>
                ) : (
                  <CSVLink
                    data={currentDrivers}
                    filename="driverData"
                    style={
                      currentDrivers.length === 0 ? { display: "none" } : {}
                    }
                  >
                    <button className="export">Export {fileDownload}</button>
                  </CSVLink>
                )}
              </div>
            </div>
          </Container>
          {isPopUpOpen && (
            <ImportData
              url={"http://localhost:5000/api/import_csv/driver"}
              fieldName={"driverData"}
              setIsPopUp={setIsPopUp}
              setNoDetail={setNoDetail}
            />
          )}
          {/* table */}
          <Container
            fluid
            className={
              isSideBarOpen
                ? "table_container p-0 active_sideBar"
                : "table_container p-0 deactive_sideBar"
            }
          >
            <div
              className="d-flex table_heading"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <h4 className="m-0">Driver Details</h4>
              <button
                onClick={() => setAddPopUp((prev) => !prev)}
                className="list_btn"
              >
                {addIcon}
              </button>
              {addPopup && <AddDriver setAddPopUp={setAddPopUp} />}
            </div>
            <Table
              className="table"
              responsive
              striped
              style={{ textAlign: "left" }}
            >
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>License no.</th>
                  <th>License expiry date</th>
                  <th>Date of joining</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentDrivers.map((driver, index) => {
                  return (
                    <tr
                      style={{ fontSize: "0.9rem", fontWeight: "400" }}
                      key={driver.id}
                    >
                      <td>{index + driverOffSet + 1}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {driver.name}
                      </td>
                      <td>{driver.mobile}</td>
                      <td>{driver.license_no}</td>
                      <td>
                        {moment(`${driver.license_exp}`).format("DD-MM-YYYY")}
                      </td>
                      <td>
                        {moment(`${driver.joining_date}`)
                          .utc(true)
                          .format("DD-MM-YYYY")}
                      </td>
                      <td>
                        <div
                          onClick={() => {
                            handleStatus(driver.id);
                            setHasBeenClicked((prev) => !prev);
                          }}
                        >
                          <ToggleSwitch status={driver.status} />
                        </div>
                      </td>
                      <td>
                        <Fragment>
                          <span
                            style={{
                              color: "#379237",
                              cursor: "pointer",
                              marginRight: "1rem",
                            }}
                            onClick={() => {
                              handleOnEdit(driver);
                            }}
                          >
                            {edit}
                          </span>
                          <span
                            style={{ color: "#C21010", cursor: "pointer" }}
                            onClick={() => {
                              handle_delete_vehicle_detail(driver.id);
                              setHasBeenClicked(!hasBeenClicked);
                            }}
                          >
                            {trash}
                          </span>
                          {id === driver.id && (
                            <EditPopup
                              data={driver}
                              dataInput={driverInput}
                              setDataInput={setDriverInput}
                              url={`http://localhost:5000/api/driver/edit-driver-detail/${driver.id}`}
                              type={"driver"}
                              setId={setId}
                              setHide={setHide}
                              setHasBeenClicked={setHasBeenClicked}
                            />
                          )}
                        </Fragment>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {noDetail && <p style={{ textAlign: "center" }}>{noDetail}</p>}
            {!hide && (
              <div className="d-flex gap-2 justify-content-center paginate_container">
                <ReactPaginate
                  className="pagination"
                  breakLabel="..."
                  nextLabel={caretRight}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel={caretLeft}
                  renderOnZeroPageCount={null}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            )}
          </Container>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
};

export default ViewDriver;
