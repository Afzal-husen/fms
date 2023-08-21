import React, { Fragment, useEffect, useState } from "react";
import {
  addIcon,
  caretLeft,
  caretRight,
  fileDownload,
  fileImport,
  search,
} from "../../utils/icons.js";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { trash, edit } from "../../utils/icons.js";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import "../../styles/vehicles.css";
import moment from "moment";
import SearchByType from "../../components/incomeExpense/SearchByType";
import { CSVLink } from "react-csv";
import ImportData from "../../components/Import_data.js";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import AddIncomeExpense from "./AddIncomeExpense";
import SearchFilter from "../../components/SearchFilter.js";
import EditPopup from "../../components/EditPopup.js";

const ViewIncomeExpense = () => {
  const [data, setData] = useState([]);
  const [numRows, setNumRows] = useState("");
  const [id, setId] = useState("");
  const [noDetail, setNoDetail] = useState("");
  const [currentIncomeData, setCurrentIncomeData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [IncomeDataOffSet, setIncomeDataOffSet] = useState(0);
  const [hide, setHide] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [addPopup, setAddPopUp] = useState(false);

  const [detailInput, setDetailInput] = useState({
    vehicle_no: "",
    license_no: "",
    description: "",
    amount: "",
    type: "",
  });

  const pages = Math.ceil(numRows / 5);
  const items = [];
  for (let i = 0; i < pages; i++) {
    items.push(i);
  }

  // fetch all data
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:5000/api/income-expense/fetch-all`;
      try {
        const { data } = await axios.get(url);

        if (data.empty) {
          setFilteredData([]);
          setNoDetail(data.message);
        } else {
          setData(data.data);
          setFilteredData(data.data);
          const { numRows } = data.numRows;
          setNumRows(parseInt(numRows));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [hasBeenClicked, isPopUpOpen]);

  // search filter
  const filterData = (e) => {
    setFilteredData(
      data.filter((detail) => {
        return detail.vehicle_name.toLowerCase().includes(e.target.value);
      })
    );
  };

  // setting offfset
  useEffect(() => {
    const endOffSet = IncomeDataOffSet + 10;
    setCurrentIncomeData(filteredData.slice(IncomeDataOffSet, endOffSet));
    setPageCount(Math.ceil(filteredData.length / 10));
  }, [filteredData, IncomeDataOffSet]);

  // delete a record
  const handle_delete_income_expense_detail = async (id) => {
    const url = `http://localhost:5000/api/income-expense/delete-detail/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnEdit = (data) => {
    setId(data.id);
    setHide(!hide);
    setDetailInput({
      vehicle_no: data.vehicle_no,
      license_no: data.license_no,
      description: data.description,
      amount: data.amount,
      type: data.type,
    });
  };

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 5) % filteredData.length;
    setIncomeDataOffSet(newOffset);
  };

  const filterData_by_date = (e) => {
    setFilteredData(
      data.filter((detail) => {
        const add_date = moment(detail.add_date)
          .utc(true)
          .format("DD-MM-YY")
          .replace(/-/g, "/");
        return add_date.includes(
          moment(e.target.value).utc(true).format("DD-MM-YY").replace(/-/g, "/")
        );
      })
    );
  };

  const filter_by_type = (e) => {
    setFilteredData(
      data.filter((detail) => {
        if (e.target.value === "income") {
          console.log(e.target.value);
          return detail.type === "income";
        } else if (e.target.value === "type") {
          console.log(e.target.value);
          return detail;
        } else {
          console.log(e.target.value);
          return detail.type === "expense";
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
                icon={search}
              />
              <SearchFilter cbFunc={filterData_by_date} type={"date"} />
              <SearchByType cbFunc={filter_by_type} />
            </div>

            {/* import export */}
            <div className="import_export">
              <button
                className="export"
                onClick={() => setIsPopUp(!isPopUpOpen)}
              >
                Import {fileImport}
              </button>
              <div>
                {filteredData.length === data.length ? (
                  <CSVLink
                    data={data}
                    filename="incomeData"
                    style={
                      currentIncomeData.length === 0 ? { display: "none" } : {}
                    }
                  >
                    <button className="export">Export {fileDownload}</button>
                  </CSVLink>
                ) : (
                  <CSVLink
                    data={currentIncomeData}
                    filename="incomeData"
                    style={
                      currentIncomeData.length === 0 ? { display: "none" } : {}
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
              url={"http://localhost:5000/api/import_csv/income"}
              fieldName={"incomeData"}
              setIsPopUp={setIsPopUp}
              setNoDetail={setNoDetail}
            />
          )}
          <Container
            fluid
            className={
              isSideBarOpen
                ? "table_container p-0 active_sideBar"
                : "table_container p-0 deactive_sideBar"
            }
          >
            <div
              className="d-flex  table_heading"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <h4>Finance Details</h4>
              <button
                onClick={() => setAddPopUp((prev) => !prev)}
                className="list_btn"
              >
                {addIcon}
              </button>
              {addPopup && <AddIncomeExpense setAddPopUp={setAddPopUp} />}
            </div>
            <Table responsive striped className="table">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Vehicle Name</th>
                  <th>Vehicle No.</th>
                  <th>Driver Name</th>
                  <th>License No.</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentIncomeData.map((detail, index) => {
                  return (
                    <tr
                      key={detail.id}
                      style={{ fontSize: "0.9rem", fontWeight: "400" }}
                    >
                      <td>{index + IncomeDataOffSet + 1}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {detail.vehicle_name}
                      </td>
                      <td>{detail.vehicle_no}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {detail.driver_name}
                      </td>
                      <td>{detail.license_no}</td>
                      <td>
                        {moment(detail.add_date).utc(true).format("DD-MM-YY")}
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {detail.description}
                      </td>
                      <td>{detail.amount}</td>
                      <td>{detail.type}</td>
                      <td>
                        <Fragment>
                          <span
                            style={{
                              color: "#379237",
                              cursor: "pointer",
                              marginRight: "1rem",
                            }}
                            onClick={() => {
                              handleOnEdit(detail);
                            }}
                          >
                            {edit}
                          </span>
                          <span
                            style={{ color: "#C21010", cursor: "pointer" }}
                            onClick={() => {
                              handle_delete_income_expense_detail(detail.id);
                              setHasBeenClicked((prev) => !prev);
                            }}
                          >
                            {trash}
                          </span>
                          {id === detail.id && (
                            <EditPopup
                              data={detail}
                              dataInput={detailInput}
                              setDataInput={setDetailInput}
                              url={`http://localhost:5000/api/income-expense/income-expense-edit/${detail.id}`}
                              type={"finance"}
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

export default ViewIncomeExpense;
