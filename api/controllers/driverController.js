import { sqlConnection } from "../connectDB.js";
import crypto from "crypto";
import { CustomError } from "../middleware/customError.js";
import xlsx from "xlsx";
import { filePath } from "../index.js";
import { filePathForImport } from "../index.js";
import { addCsvToDb } from "../utils/addImportToDb.js";




// add driver
export const add_driver_details = async (req, res, next) => {
  const id = crypto.randomBytes(10).toString("hex");
  const { name, mobile, license_exp, license_no } = req.body;

  if (!id || !name || !mobile || !license_exp)
    return next(new CustomError(400, "all the fields are required"));

  if (mobile.length !== 10)
    return next(new CustomError(400, "invalid mobile number"));

  const date_sql = "SELECT ADDDATE('" + license_exp + "', INTERVAL 0 YEAR)";
  const [row] = await sqlConnection.query(date_sql);
  const [resp] = row;
  const dateObj = Object.values(resp);
  const [dateVal] = dateObj;


  const join_date_sql = "SELECT CURRENT_DATE()";
  const [rowArr] = await sqlConnection.query(join_date_sql);
  const [response] = rowArr;
  const curr_date = Object.values(response);
  const [curr_dateVal] = curr_date;
  const driverDetail = [id, name, mobile, license_no, dateVal, curr_dateVal];

  try {
    const sql =
      "INSERT INTO driver (id, name, mobile, license_no, license_exp, joining_date) VALUES (?, ?, ?, ?, ?, ?)";
    await sqlConnection.query(sql, driverDetail);
    res.status(200).json({
      success: true,
      message: "driver details added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// fetch driver details
export const fetch_driver_details = async (req, res, next) => {
  try {
    const rowCountSql = "SELECT count(*) as numRows FROM driver";
    const [rows] = await sqlConnection.query(rowCountSql);
    const numRows = rows[0];
    const sql = "SELECT * FROM driver";
    const [drivers] = await sqlConnection.query(sql);

    if (drivers.length !== 0) {
      res.status(200).json({
        success: true,
        drivers,
        numRows,
      });
    } else {
      res.status(200).json({
        empty: true,
        message: "No driver detail available",
      });
    }
  } catch (error) {
    next(error);
  }
};

// delete driver
export const delete_driver_detail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM driver WHERE id =  ?";
    await sqlConnection.query(sql, [id]);
    res.status(200).json({
      success: true,
      message: "delete successfull",
    });
  } catch (error) {
    next(error);
  }
};

// edit a driver detail
export const edit_driver_detail = async (req, res, next) => {
  const { id } = req.params;
  const { name, mobile, license_exp, license_no } = req.body;

  if (!id || !name || !mobile || !license_exp || !license_no)
    return next(new CustomError(400, "all the fields are required"));

  const date_sql = "SELECT ADDDATE('" + license_exp + "', INTERVAL 0 YEAR)";
  const [row] = await sqlConnection.query(date_sql);
  const [resp] = row;
  const dateObj = Object.values(resp);
  const [dateVal] = dateObj;

  const driver_details = [name, mobile, license_no, dateVal];

  try {
    const sql =
      "UPDATE driver SET name= ?, mobile= ?, license_no= ?, license_exp= ? WHERE id = '" +
      id +
      "'";
    const [rows] = await sqlConnection.query(sql, driver_details);
    res.status(200).json({
      success: true,
      message: "edit successfull",
    });
  } catch (error) {
    next(error);
  }
};

// change status
export const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sqlSelect = "SELECT * FROM driver WHERE id = ?";
    const [row] = await sqlConnection.query(sqlSelect, [id]);
    const [vehicle] = row;

    let status = vehicle.status === 0 ? 1 : 0;

    const sqlUpdate = "UPDATE driver SET status = ? WHERE id = '" + id + "'";
    await sqlConnection.query(sqlUpdate, [status]);
    res.status(200).json({
      success: true,
      message: status === 1 ? "Active" : "Inactive",
      status,
    });
  } catch (error) {
    next(error);
  }
};

//view vehicle details
export const view_driver_details = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM driver WHERE id = '" + id + "'";
    const [row] = await sqlConnection.query(sql);
    const [driver] = row;
    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    next(error);
  }
};

// json to sheet
export const json_to_sheets = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM driver";
    const [data] = await sqlConnection.query(sql);

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "data_Sheet");
    xlsx.writeFile(workbook, "./excel-data/driverData.csv");
    const file = filePath + req.params.filename;
    res.download(file);
  } catch (error) {
    next(error);
  }
};

// import csv
export const import_csv_driver = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const import_path = filePathForImport + filename;

    addCsvToDb(import_path,  "driver");
    res.status(200).json({
      success: true,
      message: "Data import success",
    });
  } catch (error) {
    next(error);
  }
};
