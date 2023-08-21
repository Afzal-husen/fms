import React, { Fragment, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import {
  trash,
  edit,
  search,
  fileDownload,
  fileImport,
  caretRight,
  caretLeft,
  addIcon,
} from "../../utils/icons.js";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import ReactPaginate from "react-paginate";
import SearchByStatus from "../../components/fuel/SearchByStatus";
import ToggleSwitch from "../../components/ToggleSwitch";
import { CSVLink } from "react-csv";
import ImportData from "../../components/Import_data.js";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import AddFuel from "./AddFuel";
import SearchFilter from "../../components/SearchFilter";
import EditPopup from "../../components/EditPopup.js";

const ViewDriver = () => {
  const [fuels, setFuels] = useState([]);
  const [id, setId] = useState("");
  const [numRows, setNumRows] = useState("");
  const [noDetail, setNoDetail] = useState("");
  const [currentFuels, setCurrentFuels] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [fuelOffSet, setFuelOffSet] = useState(0);
  const [hide, setHide] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isPopUp, setIsPopUp] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [addPopup, setAddPopUp] = useState(false);

  const [fuelInput, setFuelInput] = useState({
    vehicle_no: "",
    license_no: "",
    fuel_fill_date: "",
    quantity: "",
    fuel_total_price: "",
    fuel_filled_by: "",
    odometer: "",
  });

  const pages = Math.ceil(numRows / 5);
  const items = [];
  for (let i = 0; i < pages; i++) {
    items.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:5000/api/fuel/fuel-details`;
      try {
        const { data } = await axios.get(url);

        if (data.empty) {
          setFilteredData([]);
          setNoDetail(data.message);
        } else {
          setFuels(data.fuel_detail);
          setFilteredData(data.fuel_detail);
          const { numRows } = data.numRows;
          setNumRows(parseInt(numRows));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [hasBeenClicked, numRows, isPopUp]);

  useEffect(() => {
    const endOffSet = fuelOffSet + 10;
    filteredData && setCurrentFuels(filteredData.slice(fuelOffSet, endOffSet));
    filteredData && setPageCount(Math.ceil(filteredData.length / 10));
  }, [filteredData, fuelOffSet]);

  const handle_delete_vehicle_detail = async (id) => {
    console.log(id);
    const url = `http://localhost:5000/api/fuel/fuel-detail-delete/${id}`;
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
    setFuelInput({
      vehicle_no: data.vehicle_no,
      license_no: data.license_no,
      fuel_fill_date: data.fuel_fill_date,
      quantity: data.quantity,
      fuel_total_price: data.fuel_total_price,
      fuel_filled_by: data.fuel_filled_by,
      odometer: data.odometer,
    })
  };

  const handleStatus = async (id) => {
    const url = `http://localhost:5000/api/fuel/update-status/${id}`;
    try {
      await axios.patch(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 5) % filteredData.length;
    setFuelOffSet(newOffset);
  };

  // filter by status
  const filter_by_status = (e) =>
    setFilteredData(
      fuels.filter((fuel) => {
        if (e.target.value === "Active") {
          return fuel.status.toString().includes("1");
        } else if (e.target.value === "All") {
          return fuel;
        } else {
          return fuel.status.toString().includes("0");
        }
      }),
    );

  // filter by name
  const filterData_by_driver = (e) =>
    setFilteredData(
      fuels.filter((fuel) =>
        fuel.fuel_filled_by.toLowerCase().includes(e.target.value),
      ),
    );

  // filter by vehicle
  const filterData_by_vehicle = (e) =>
    setFilteredData(
      fuels.filter((fuel) =>
        fuel.vehicle_name.toLowerCase().includes(e.target.value),
      ),
    );

  const filterData_by_date = (e) =>
    setFilteredData(
      fuels.filter((fuel) => {
        const fuel_fill_date = moment(fuel.fuel_fill_date)
          .utc(true)
          .format("DD-MM-YY")
          .replace(/-/g, "/");
        return fuel_fill_date.includes(
          moment(e.target.value)
            .utc(true)
            .format("DD-MM-YY")
            .replace(/-/g, "/"),
        );
      }),
    );
  return (
    <Fragment>
      {/* <Layout /> */}
      <div className="aside_view">
        <Aside
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />
        <div className="header_aside">
          <Header isSideBarOpen={isSideBarOpen} />
          <Container
            fluid
            className={isSideBarOpen ? "p-0  view_container active_sideBar" : "p-0 view_container deactive_sideBar"}>
            <div>
              <SearchFilter
                cbFunc={filterData_by_vehicle}
                placeholder={"search vehicle.."}
                type={"text"}
                search={search}
              />
              <SearchFilter
                cbFunc={filterData_by_driver}
                placeholder={"search driver..."}
                type={"text"}
                search={search}
              />
              <SearchFilter
                cbFunc={filterData_by_date}
                type={"date"}
                label={"Fill Date:"}
              />
              <SearchByStatus cbFunc={filter_by_status} />
            </div>

            {/* import export */}
            <div className="import_export">
              <button
                className="export"
                onClick={() => setIsPopUp((prev) => !prev)}>
                Import {fileImport}
              </button>
              <div>
                {filteredData.length === fuels.length ? (
                  <CSVLink
                    data={fuels}
                    filename="fuelData"
                    style={
                      currentFuels.length === 0 ? { display: "none" } : {}
                    }>
                    <button className="export">Export {fileDownload}</button>
                  </CSVLink>
                ) : (
                  <CSVLink
                    data={currentFuels}
                    filename="fuelData"
                    style={
                      currentFuels.length === 0 ? { display: "none" } : {}
                    }>
                    <button className="export">Export {fileDownload}</button>
                  </CSVLink>
                )}
              </div>
            </div>
          </Container>
          {isPopUp && (
            <ImportData
              url={"http://localhost:5000/api/import_csv/fuel"}
              fieldName={"fuelData"}
              setIsPopUp={setIsPopUp}
              setNoDetail={setNoDetail}
            />
          )}

          {/* table */}
          <Container
            fluid
            className={isSideBarOpen ? "table_container p-0 active_sideBar" : "table_container p-0 deactive_sideBar"}>
            <div
              className="d-flex table_heading"
              style={{ width: "100%", justifyContent: "space-between" }}>
              <h4>fuel Details</h4>
              <button
                onClick={() => setAddPopUp((prev) => !prev)}
                className="list_btn">
                {addIcon}
              </button>
              {addPopup && <AddFuel setAddPopUp={setAddPopUp} />}
            </div>
            <Table className="table" responsive striped>
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Vehicle Name</th>
                  <th>Vehicle No.</th>
                  <th>Filled By</th>
                  <th>License No.</th>
                  <th>Fill Date</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Odometer</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentFuels.map((fuel, index) => {
                  return (
                    <tr key={fuel.id}>
                      <td>{index + fuelOffSet + 1}</td>
                      <td style={{textTransform: "capitalize"}}>{fuel.vehicle_name}</td>
                      <td>{fuel.vehicle_no}</td>
                      <td style={{textTransform: "capitalize"}}>{fuel.fuel_filled_by}</td>
                      <td>{fuel.license_no}</td>
                      <td>
                        {moment(`${fuel.fuel_fill_date}`).format("DD-MM-YYYY")}
                      </td>
                      <td>{fuel.quantity}</td>
                      <td>{fuel.fuel_total_price}</td>
                      <td>{fuel.odometer}</td>
                      <td>
                        <div
                          onClick={() => {
                            handleStatus(fuel.id);
                            setHasBeenClicked((prev) => !prev);
                          }}>
                          <ToggleSwitch status={fuel.status} />
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
                              handleOnEdit(fuel);
                            }}>
                            {edit}
                          </span>
                          <span
                            style={{ color: "#C21010", cursor: "pointer" }}
                            onClick={() => {
                              handle_delete_vehicle_detail(fuel.id);
                              setHasBeenClicked(!hasBeenClicked);
                            }}>
                            {trash}
                          </span>
                          {id === fuel.id && (
                            <EditPopup
                            data={fuel}
                              dataInput={fuelInput}
                              setDataInput={setFuelInput}
                              url={`http://localhost:5000/api/fuel/fuel-edit/${fuel.id}`}
                              type={"fuel"}
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
