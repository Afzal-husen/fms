import React, { Fragment, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
// import path from "../../../../api/vehicleImages"
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
import ReactPaginate from "react-paginate";
import "../../styles/vehicles.css";
import SearchByStatus from "../../components/vehicle/SearchByStatus";
import ToggleSwitch from "../../components/ToggleSwitch";
import { CSVLink } from "react-csv";
import ImportData from "../../components/Import_data";
import Aside from "../../components/Aside";
import Header from "../../components/Header";
import AddVehicle from "./AddVehicle";
import SearchFilter from "../../components/SearchFilter.js";
import EditPopup from "../../components/EditPopup.js";

const ViewVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [numRows, setNumRows] = useState("");
  const [id, setId] = useState("");
  const [noDetail, setNoDetail] = useState("");
  const [currentVehicles, setCurrentVehicles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [vehicleOffSet, setVehicleOffSet] = useState(0);
  const [hide, setHide] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [addPopup, setAddPopUp] = useState(false);

  const [vehicleInput, setVehicleInput] = useState({
    vehicle_name: "",
    vehicle_no: "",
    vehicle_type: "",
    vehicle_model: "",
    engine_no: "",
    chassis_no: "",
  });

  const [fileInput, setFileInput] = useState("");

  const pages = Math.ceil(numRows / 5);
  const items = [];
  for (let i = 0; i < pages; i++) {
    items.push(i);
  }

  // fetch all data
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:5000/api/vehicle/vehicle-details`;
      try {
        const { data } = await axios.get(url);
        console.log(data);

        if (data.empty) {
          setFilteredData([]);
          setNoDetail(data.message);
        } else {
          setVehicles(data.vehicles);
          setFilteredData(data.vehicles);
          const { numRows } = data.numRows;
          setNumRows(parseInt(numRows));
        }
      } catch (error) {
        setVehicles([]);
        console.error(error);
      }
    };
    fetchData();
  }, [hasBeenClicked, isPopUpOpen]);

  // search filter
  const filterData = (e) => {
    setFilteredData(
      vehicles.filter((vehicle) => {
        return vehicle.vehicle_name.toLowerCase().includes(e.target.value);
      })
    );
  };

  // setting offfset
  useEffect(() => {
    const endOffSet = vehicleOffSet + 5;
    setCurrentVehicles(filteredData.slice(vehicleOffSet, endOffSet));
    setPageCount(Math.ceil(filteredData.length / 5));
  }, [filteredData, vehicleOffSet]);

  // delete a record
  const handle_delete_vehicle_detail = async (id) => {
    const url = `http://localhost:5000/api/vehicle/delete-vehicle-detail/${id}`;
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
    setId(data.vehicle_id);
    setHide(!hide);
    setVehicleInput({
      vehicle_name: data.vehicle_name,
      vehicle_no: data.vehicle_no,
      vehicle_type: data.vehicle_type,
      vehicle_model: data.vehicle_model,
      engine_no: data.engine_no,
      chassis_no: data.chassis_no,
    });
  };

  const handleStatus = async (id) => {
    const url = `http://localhost:5000/api/vehicle//update-status/${id}`;
    try {
      await axios.patch(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 5) % filteredData.length;
    setVehicleOffSet(newOffset);
  };

  const filter_by_status = (e) => {
    setFilteredData(
      vehicles.filter((vehicle) => {
        if (e.target.value === "Active") {
          return vehicle.status.toString().includes("1");
        } else if (e.target.value === "All vehicles") {
          return vehicle;
        } else {
          return vehicle.status.toString().includes("0");
        }
      })
    );
  };

  const filterData_by_num = (e) => {
    setFilteredData(
      vehicles.filter((vehicle) => {
        if (vehicle.engine_no.toString().includes(e.target.value)) {
          return vehicle.engine_no.toString().includes(e.target.value);
        } else {
          return vehicle.chassis_no.toString().includes(e.target.value);
        }
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
                ? "p-0  view_container active_sideBar"
                : "p-0 view_container deactive_sideBar"
            }
          >
            {/* filters */}
            <div className="filters">
              <SearchFilter
                cbFunc={filterData}
                placeholder={"search vehicle name..."}
                type={"text"}
              />
              <SearchFilter
                cbFunc={filterData_by_num}
                placeholder={"search engine no. & chassis no..."}
                type={"text"}
              />
              <SearchByStatus cbFunc={filter_by_status} />
            </div>

            {/* import export btns */}
            <div className="import_export">
              <button
                className="export"
                onClick={() => setIsPopUp(!isPopUpOpen)}
              >
                Import {fileImport}
              </button>
              <div>
                {filteredData.length === vehicles.length ? (
                  <CSVLink
                    data={vehicles}
                    filename="vehicleData"
                    style={
                      currentVehicles.length === 0 ? { display: "none" } : {}
                    }
                  >
                    <button className="export">Export {fileDownload}</button>
                  </CSVLink>
                ) : (
                  <CSVLink
                    data={currentVehicles}
                    filename="vehicleData"
                    style={
                      currentVehicles.length === 0 ? { display: "none" } : {}
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
              url={"http://localhost:5000/api/import_csv/vehicle"}
              fieldName={"vehicleData"}
              setIsPopUp={setIsPopUp}
              setNoDetail={setNoDetail}
            />
          )}

          {/* table */}
          <Container
            className={
              isSideBarOpen
                ? "table_container p-0 active_sideBar"
                : "table_container p-0 deactive_sideBar"
            }
            fluid
          >
            <div className="d-flex table_heading">
              <h4 className="m-0 ">Vehicle Details</h4>
              <button
                onClick={() => setAddPopUp((prev) => !prev)}
                className="list_btn"
              >
                {addIcon}
              </button>
              {addPopup && (
                <AddVehicle
                  setAddPopUp={setAddPopUp}
                  setHasBeenClicked={setHasBeenClicked}
                />
              )}
            </div>
            <Table responsive className="table" striped>
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Vehicle Name</th>
                  <th>Vehicle No.</th>
                  <th>Vehicle Type</th>
                  <th>Vehicle Model</th>
                  <th>Engine No.</th>
                  <th>Chassis No.</th>
                  <th>Active</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentVehicles.map((vehicle, index) => {
                  return (
                    <tr
                      style={{ fontSize: "0.9rem", fontWeight: "400" }}
                      key={vehicle.vehicle_id}
                    >
                      <td>{index + vehicleOffSet + 1}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {vehicle.vehicle_name}
                      </td>
                      <td>{vehicle.vehicle_no}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {vehicle.vehicle_type}
                      </td>
                      <td>{vehicle.vehicle_model}</td>
                      <td>{vehicle.engine_no}</td>
                      <td>{vehicle.chassis_no}</td>
                      <td>
                        <div
                          onClick={() => {
                            handleStatus(vehicle.vehicle_id);
                            setHasBeenClicked((prev) => !prev);
                          }}
                        >
                          <ToggleSwitch status={vehicle.status} />
                        </div>
                      </td>
                      <td>
                        <img className="image" src="" alt="vehicle" />
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
                              handleOnEdit(vehicle);
                            }}
                          >
                            {edit}
                          </span>
                          <span
                            style={{ color: "#C21010", cursor: "pointer" }}
                            onClick={() => {
                              handle_delete_vehicle_detail(vehicle.vehicle_id);
                              setHasBeenClicked((prev) => !prev);
                            }}
                          >
                            {trash}
                          </span>
                          {id === vehicle.vehicle_id && (
                            <EditPopup
                              data={vehicle}
                              dataInput={vehicleInput}
                              setDataInput={setVehicleInput}
                              url={`http://localhost:5000/api/vehicle/edit-vehicle-detail/${vehicle.vehicle_id}`}
                              type={"vehicle"}
                              setId={setId}
                              setHide={setHide}
                              setHasBeenClicked={setHasBeenClicked}
                              fileInput={fileInput}
                              setFileInput={setFileInput}
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

export default ViewVehicles;
