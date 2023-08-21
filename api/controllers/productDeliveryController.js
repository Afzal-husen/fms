import { sqlConnection } from "../connectDB.js";
import crypto from "crypto";
import { CustomError } from "../middleware/customError.js";
import { filePathForImport } from "../index.js";
import { addCsvToDb } from "../utils/addImportToDb.js";

// get vehicle and driver details
export const get_from_vehicle_driver = async (req, res, next) => {
  try {
    const vehicle_sql = "select vehicle_no, vehicle_name from vehicle"
    const driver_sql = "select name, license_no from driver"
    const [vehicle_rows] = await sqlConnection.query(vehicle_sql)
    const [driver_rows] = await sqlConnection.query(driver_sql)

    res.status(200).json({
      success: true,
      data_vehicle: vehicle_rows,
      data_driver: driver_rows
    });
  } catch (error) {
    next(error);
  }
};

// add delivery details
export const add_delivery_details = async (req, res, next) => {
  const {
    product_name,
    product_price,
    vehicle_no,
    license_no,
    dispatch_add,
    del_add,
    del_distance,
  } = req.body;
  if (
    !product_name ||
    !product_price ||
    !vehicle_no ||
    !license_no ||
    !dispatch_add ||
    !del_add ||
    !del_distance
    )
    return next(new CustomError(400, "all fields are required"));
    
    const product_id = crypto.randomBytes(10).toString("hex");
    
    const [r1] = await sqlConnection.query("select vehicle_name from vehicle where vehicle_no= '"+vehicle_no+"'")
    const vehicle_name = r1[0].vehicle_name

    const [r2] = await sqlConnection.query("select name from driver where license_no= '"+license_no+"'")
    const driver_name = r2[0].name

  const delivery_details = [
    product_id,
    product_name,
    product_price,
    vehicle_name,
    vehicle_no,
    driver_name,
    license_no,
    dispatch_add,
    del_add,
    del_distance,
  ];
  try {
    const sql =
      "INSERT INTO product_delivery (product_id, product_name, product_price, vehicle_name, vehicle_no, driver_name, license_no, dispatch_add, del_add, del_distance) VALUES (?,?,?,?,?,?,?,?,?,?)";
    await sqlConnection.query(sql, delivery_details);
    res.status(200).json({
      success: true,
      message: "Details added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// fetch data
export const fetch_delivery_data = async (req, res, next ) => {
  try {
    const rowCountSql = "SELECT count(*) as numRows FROM product_delivery";
    const [r] = await sqlConnection.query(rowCountSql);
    const numRows = r[0];
    console.log(r)
    const sql = "SELECT * FROM product_delivery"
    const [rows] = await sqlConnection.query(sql)
    res.status(200).json({
      success: true,
      data: rows,
      numRows
    })
  } catch (error) {
    next(error)
  }
} 


// edit delivery detail
export const edit_delivery_detail = async (req, res, next) => {
  const { id } = req.params;
  const {
    product_name,
    product_price,
    vehicle_name,
    vehicle_no,
    driver_name,
    license_no,
    dispatch_add,
    del_add,
    del_distance,
  } = req.body;

  if (
    !product_name ||
    !product_price ||
    !vehicle_name ||
    !vehicle_no ||
    !driver_name ||
    !license_no ||
    !dispatch_add ||
    !del_add ||
    !del_distance
  )
    return next(new CustomError(400, "all the fields are required"));


    const delivery_details = [
      product_name,
      product_price,
      vehicle_name,
      vehicle_no,
      driver_name,
      license_no,
      dispatch_add,
      del_add,
      del_distance,
    ];
  try {
    const sql =
      "UPDATE product_delivery SET product_name= ?, product_price= ?, vehicle_name= ?, vehicle_no= ?, driver_name= ?, license_no= ?, dispatch_add= ?, del_add= ?, del_distance= ? WHERE product_id = '" +
      id +
      "'";
    const [rows] = await sqlConnection.query(sql, delivery_details);
    console.log(rows);
    res.status(200).json({
      success: true,
      message: "edit successfull",
    });
  } catch (error) {
    next(error);
  }
};

// delete delivery
export const delete_delivery_detail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM product_delivery WHERE product_id =  ?";
    await sqlConnection.query(sql, [id]);
    res.status(200).json({
      success: true,
      message: "delete successfull",
    });
  } catch (error) {
    next(error);
  }
};

// import csv
export const import_csv_delivery = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const import_path = filePathForImport + filename;
    addCsvToDb(import_path, "delivery", next);
    res.status(200).json({
      success: true,
      message: "Data import success",
    });
  } catch (error) {
    next(error);
  }
};

