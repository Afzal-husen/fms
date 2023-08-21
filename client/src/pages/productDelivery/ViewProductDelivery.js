import React, { Fragment, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import {
  addIcon,
  caretLeft,
  caretRight,
  edit,
  fileDownload,
  fileImport,
  trash,
} from "../../utils/icons";
import SearchByStatus from "../../components/productDelivery/SearchByStatus";
// import EditPopup from "../../components/productDelivery/EditPopUp";
import EditPopup from "../../components/EditPopup.js";
import ImportData from "../../components/Import_data";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import AddProductDelivery from "./AddProductDelivery";
import SearchFilter from "../../components/SearchFilter";

const ViewProductDelivery = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hide, setHide] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [dataOffSet, setDataOffSet] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const [id, setId] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [noDetail, setNoDetail] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [addPopup, setAddPopUp] = useState(false);

  const [formInput, setFormInput] = useState({
    product_name: "",
    product_price: "",
    vehicle_name: "",
    vehicle_no: "",
    driver_name: "",
    license_no: "",
    dispatch_add: "",
    del_add: "",
    del_distance: "",
  });

  useEffect(() => {
    const url = "http://localhost:5000/api/fetch-delivery_data";
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        console.log(data.data);
        setData(data.data);
        setFilteredData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [hasBeenClicked, isDataFetched, openImport]);

  // setting offfset
  useEffect(() => {
    const endOffSet = dataOffSet + 10;
    setCurrentData(filteredData.slice(dataOffSet, endOffSet));
    setPageCount(Math.ceil(filteredData.length / 10));
  }, [filteredData, dataOffSet]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 5) % filteredData.length;
    setDataOffSet(newOffset);
  };

  const filter_by_order_id = (e) => {
    setFilteredData(
      data.filter((item) => {
        return item.product_id.toLowerCase().includes(e.target.value);
      })
    );
  };

  const filter_by_product_name = (e) => {
    setFilteredData(
      data.filter((item) => {
        return item.product_name.toLowerCase().includes(e.target.value);
      })
    );
  };

  const filter_by_driver_name = (e) => {
    setFilteredData(
      data.filter((item) => {
        return item.driver_name.toLowerCase().includes(e.target.value);
      })
    );
  };

  const filter_by_license_no = (e) => {
    setFilteredData(
      data.filter((item) => {
        return item.license_no.toLowerCase().includes(e.target.value);
      })
    );
  };

  const filter_by_status = (e) => {
    setFilteredData(
      data.filter((item) => {
        if (e.target.value === "delivered") {
          return item.status.toString().includes("1");
        } else if (e.target.value === "All") {
          return item;
        } else {
          return item.status.toString().includes("0");
        }
      })
    );
  };

  const handleOnEdit = (data) => {
    setId(data.product_id);
    setHide((prev) => !prev);
    setFormInput({
      product_name: data.product_name,
      product_price: data.product_price,
      vehicle_name: data.vehicle_name,
      vehicle_no: data.vehicle_no,
      driver_name: data.driver_name,
      license_no: data.license_no,
      dispatch_add: data.dispatch_add,
      del_add: data.del_add,
      del_distance: data.del_distance,
    });
  };

  const handle_delete_vehicle_detail = async (id) => {
    const url = `http://localhost:5000/api/delete-delivery_detail/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error(error);
    }
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
            className={isSideBarOpen ? "p-0  view_container active_sideBar" : "p-0 view_container deactive_sideBar"} 
          >
            {/* filters */}
            <div className="filters">
              <SearchFilter
                placeholder={"order id"}
                type={"text"}
                cbFunc={filter_by_order_id}
              />
              <SearchFilter
                placeholder={"product name"}
                type={"text"}
                cbFunc={filter_by_product_name}
              />
              <SearchFilter
                placeholder={"driver name"}
                type={"text"}
                cbFunc={filter_by_driver_name}
              />
              <SearchFilter
                placeholder={"license no"}
                type={"text"}
                cbFunc={filter_by_license_no}
              />
              <SearchByStatus cbFunc={filter_by_status} />
            </div>

            {/* import export */}
            <div className="import_export">
              <button className="export" onClick={() => setOpenImport(true)}>
                Import {fileImport}
              </button>
              <div>
                {filteredData.length === data.length ? (
                  <CSVLink
                    data={data}
                    filename="deliveryData"
                    style={currentData.length === 0 ? { display: "none" } : {}}
                  >
                    <button className="export">Export {fileDownload}</button>
                  </CSVLink>
                ) : (
                  <CSVLink
                    data={currentData}
                    filename="deliveryData"
                    style={currentData.length === 0 ? { display: "none" } : {}}
                  >
                    <button className="export">Export {fileDownload}</button>
                  </CSVLink>
                )}
              </div>
            </div>
          </Container>
          {openImport && (
            <ImportData
              url={"http://localhost:5000/api/import_csv/delivery"}
              fieldName={"deliveryData"}
              setIsPopUp={setOpenImport}
              // setNoDetail={setNoDetail}
            />
          )}
          <Container
            fluid
            className={isSideBarOpen ? "table_container p-0 active_sideBar" : "table_container p-0 deactive_sideBar"}
          >
            <div
              className="d-flex table_heading"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <h4>Delivery Details</h4>
              <button
                onClick={() => setAddPopUp((prev) => !prev)}
                className="list_btn"
              >
                {addIcon}
              </button>
              {addPopup && <AddProductDelivery setAddPopUp={setAddPopUp} />}
            </div>
            <Table striped responsive className="table">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Order id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Vehicle Name</th>
                  <th>Vehicle No.</th>
                  <th>Driver Name</th>
                  <th>License No.</th>
                  <th>Dispatch Addr</th>
                  <th>Delivery Addr</th>
                  <th>Distance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData &&
                  currentData.map((obj, index) => (
                    <tr style={{ fontSize: "0.9rem", fontWeight: "400" }}>
                      <td>{index + dataOffSet + 1}</td>
                      <td>{obj.product_id}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {obj.product_name}
                      </td>
                      <td>{obj.product_price}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {obj.vehicle_name}
                      </td>
                      <td>{obj.vehicle_no}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {obj.driver_name}
                      </td>
                      <td>{obj.license_no}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {obj.dispatch_add}
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {obj.del_add}
                      </td>
                      <td>{obj.del_distance}</td>
                      <td>
                        {obj.status === 0 ? "not delivered" : "delivered"}
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
                              handleOnEdit(obj);
                            }}
                          >
                            {edit}
                          </span>
                          <span
                            style={{ color: "#C21010", cursor: "pointer" }}
                            onClick={() => {
                              handle_delete_vehicle_detail(obj.product_id);
                              setHasBeenClicked((prev) => !prev);
                            }}
                          >
                            {trash}
                          </span>
                          {id === obj.product_id && (
                            <EditPopup
                              data={obj}
                              dataInput={formInput}
                              setDataInput={setFormInput}
                              url={`http://localhost:5000/api/edit-delivery_detail/${obj.product_id}`}
                              setId={setId}
                              setHide={setHide}
                              setHasBeenClicked={setHasBeenClicked}
                            />
                          )}
                        </Fragment>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {!hide && (
              <div className="d-flex gap-2 justify-content-center  paginate_container">
                <ReactPaginate
                  className="pagination"
                  breakLabel="..."
                  nextLabel={caretRight}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
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
    </Fragment>
  );
};

export default ViewProductDelivery;
