import { sqlConnection } from "../connectDB.js";
import crypto from "crypto";
import { CustomError } from "../middleware/customError.js";
import { filePath, filePathForImport } from "../index.js";
import xlsx from "xlsx";
import { addCsvToDb } from "../utils/addImportToDb.js";

// add fuel detail
export const add_fuel = async (req, res, next) => {
  const {
    vehicle_no,
    license_no,
    fuel_fill_date,
    quantity,
    fuel_total_price,
    odometer,
  } = req.body;

  if (
    !vehicle_no ||
    !license_no ||
    !fuel_fill_date ||
    !quantity ||
    !fuel_total_price ||
    !odometer
  )
    return next(new CustomError(400, "All fields are required"));

  const id = crypto.randomBytes(10).toString("hex");

  try {
    const date_sql =
      "SELECT ADDDATE('" + fuel_fill_date + "', INTERVAL 0 YEAR)";
    const [row] = await sqlConnection.query(date_sql);
    const [obj] = row;
    const date_val = Object.values(obj)[0];

    const [r1] = await sqlConnection.query(
      "select vehicle_name from vehicle where vehicle_no= '" + vehicle_no + "'"
    );
    const vehicle_name = r1[0].vehicle_name;

    const [r2] = await sqlConnection.query(
      "select name from driver where license_no= '" + license_no + "'"
    );
    const driver_name = r2[0].name;

    const fuel_detail = [
      id,
      vehicle_name,
      vehicle_no,
      driver_name,
      license_no,
      date_val,
      quantity,
      fuel_total_price,
      odometer,
    ];

    const sql =
      "INSERT INTO fuel (id, vehicle_name, vehicle_no, fuel_filled_by, license_no, fuel_fill_date, quantity, fuel_total_price, odometer) VALUES (?,?,?,?,?,?,?,?,?)";
    await sqlConnection.query(sql, fuel_detail);
    res.status(200).json({
      success: true,
      message: "fuel detail successfully added",
    });
  } catch (error) {
    next(error);
  }
};

// fetch fuel details
export const fetch_fuel_details = async (req, res, next) => {
  try {
    const rowCountSql = "SELECT count(*) as numRows FROM driver";
    const [rows] = await sqlConnection.query(rowCountSql);
    const numRows = rows[0];
    const sql = "SELECT * FROM fuel";
    const [fuel_detail] = await sqlConnection.query(sql);
    if (fuel_detail.length !== 0) {
      res.status(200).json({
        success: true,
        fuel_detail,
        numRows,
      });
    } else {
      res.status(200).json({
        empty: true,
        message: "No fuel detail available",
      });
    }
  } catch (error) {
    next(error);
  }
};

// dellete fuel details
export const fuel_detail_delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM fuel WHERE id = '" + id + "'";
    await sqlConnection.query(sql);
    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// edit fuel detail
export const edit_fuel_detail = async (req, res, next) => {
  const { id } = req.params;
  const {
    vehicle_no,
    license_no,
    fuel_fill_date,
    quantity,
    fuel_total_price,
    odometer,
  } = req.body;

  if (
    !vehicle_no ||
    !fuel_fill_date ||
    !quantity ||
    !fuel_total_price ||
    !license_no ||
    !odometer
  )
    return next(new CustomError(400, "All fields are required"));

  const date_sql = "SELECT ADDDATE('" + fuel_fill_date + "', INTERVAL 0 YEAR)";
  const [row] = await sqlConnection.query(date_sql);
  const [obj] = row;
  const date_val = Object.values(obj)[0];

  try {
    const [r1] = await sqlConnection.query(
      "select vehicle_name from vehicle where vehicle_no= '" + vehicle_no + "'"
    );
    const vehicle_name = r1[0].vehicle_name;

    const [r2] = await sqlConnection.query(
      "select name from driver where license_no= '" + license_no + "'"
    );
    const driver_name = r2[0].name;

    const fuel_detail = [
      vehicle_name,
      vehicle_no,
      driver_name,
      license_no,
      date_val,
      quantity,
      fuel_total_price,
      odometer,
    ];
    const sql =
      "UPDATE fuel SET vehicle_name= ?, vehicle_no= ?, fuel_filled_by= ?, license_no= ?, fuel_fill_date= ?, quantity= ?, fuel_total_price= ?,  odometer= ? WHERE id = '" +
      id +
      "'";
    const [rows] = await sqlConnection.query(sql, fuel_detail);
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
    const sqlSelect = "SELECT * FROM fuel WHERE id = ?";
    const [row] = await sqlConnection.query(sqlSelect, [id]);
    const [fuel] = row;

    let status = fuel.status === 0 ? 1 : 0;

    const sqlUpdate = "UPDATE fuel SET status = ? WHERE id = '" + id + "'";
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

//view fuel details
export const view_fuel_details = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM fuel WHERE id = '" + id + "'";
    const [row] = await sqlConnection.query(sql);
    const [fuel] = row;
    res.status(200).json({
      success: true,
      fuel,
    });
  } catch (error) {
    next(error);
  }
};

// json to sheet
export const json_to_sheets = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM fuel";
    const [data] = await sqlConnection.query(sql);

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "data_Sheet");
    xlsx.writeFile(workbook, "./excel-data/fuelData.csv");
    const file = filePath + req.params.filename;
    res.download(file);
  } catch (error) {
    next(error);
  }
};

// import csv
export const import_csv_fuel = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const import_path = filePathForImport + filename;

    addCsvToDb(import_path, "fuel");
    res.status(200).json({
      success: true,
      message: "Data import success",
    });
  } catch (error) {
    next(error);
  }
};
