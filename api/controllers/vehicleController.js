import { sqlConnection } from "../connectDB.js";
import { CustomError } from "../middleware/customError.js";
import crypto from "crypto";
import xlsx from "xlsx";
import { filePath, filePathForImport } from "../index.js";
import { addCsvToDb } from "../utils/addImportToDb.js";
import { vehicleImagesPath } from "../index.js";
import fs from "fs";

//add vehicle details
export const add_vehicle = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host") + "/vehicleImages/";
  const {
    vehicle_name,
    vehicle_no,
    vehicle_type,
    vehicle_model,
    engine_no,
    chassis_no,
  } = req.body;

  try {
    const id = crypto.randomBytes(10).toString("hex");

    if (
      !id ||
      !vehicle_name ||
      !vehicle_model ||
      !vehicle_no ||
      !vehicle_type ||
      !engine_no ||
      !chassis_no ||
      req.file === undefined
    )
      return next(new CustomError(400, "all the fields are required"));

    const { filename } = req.file;
    const imageUrl = url + filename;

    const vehicleDetail = [
      id,
      vehicle_name,
      vehicle_no,
      vehicle_type,
      vehicle_model,
      engine_no,
      chassis_no,
      imageUrl,
    ];

    const sql =
      "INSERT INTO vehicle (vehicle_id, vehicle_name, vehicle_no, vehicle_type, vehicle_model, engine_no, chassis_no, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    const [rows] = await sqlConnection.query(sql, vehicleDetail);
    res.status(200).json({
      success: true,
      message: "vehicle details added successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// fetch all vehicles details
export const fetch_vehicle_details = async (req, res, next) => {
  try {
    const rowCountSql = "SELECT count(*) as numRows FROM vehicle";
    const [rows] = await sqlConnection.query(rowCountSql);
    const numRows = rows[0];
    const sql = "SELECT * FROM vehicle";
    const [vehicles] = await sqlConnection.query(sql);

    if (vehicles.length !== 0) {
      res.status(200).json({
        success: true,
        vehicles,
        numRows,
      });
    } else {
      res.status(200).json({
        empty: true,
        message: "No vehicle detail found",
      });
    }
  } catch (error) {
    next(error);
  }
};

// delete vehicle
export const delete_vehicle_detail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM vehicle WHERE vehicle_id =  ?";
    await sqlConnection.query(sql, [id]);
    res.status(200).json({
      success: true,
      message: "delete successfull",
    });
  } catch (error) {
    next(error);
  }
};

// edit a vehicle detail
export const edit_vehicle_detail = async (req, res, next) => {
  const { id } = req.params;
  const {
    vehicle_name,
    vehicle_no,
    vehicle_type,
    vehicle_model,
    engine_no,
    chassis_no,
  } = req.body;

  if (
    !vehicle_name ||
    !vehicle_model ||
    !vehicle_no ||
    !vehicle_type ||
    !engine_no ||
    !chassis_no
  )
    return next(new CustomError(400, "all the fields are required"));

  if (req.file === undefined) {
    const vehicle_details = [
      vehicle_name,
      vehicle_no,
      vehicle_type,
      vehicle_model,
      engine_no,
      chassis_no,
    ];

    try {
      const sql =
        "UPDATE vehicle SET vehicle_name= ?, vehicle_no= ?, vehicle_type= ?, vehicle_model= ?, engine_no= ?, chassis_no= ? 	 WHERE vehicle_id = '" +
        id +
        "'";
      const [rows] = await sqlConnection.query(sql, vehicle_details);
      res.status(200).json({
        success: true,
        message: "edit successfull",
      });
    } catch (error) {
      next(error);
    }
  } else {
    const url = req.protocol + "://" + req.get("host") + "/vehicleImages/";
    const { filename } = req.file;
    const imageUrl = url + filename;

    const vehicle_details = [
      vehicle_name,
      vehicle_no,
      vehicle_type,
      vehicle_model,
      engine_no,
      chassis_no,
      imageUrl,
    ];

    try {
      const [r] = await sqlConnection.query(
        "select * from vehicle where vehicle_id = '" + id + "'"
      );
      const [vehicle] = r;

      if(vehicle.image_url) {
        const imageName = vehicle.image_url.split("/")[4];
        const deleteImagePath = vehicleImagesPath + imageName;
        fs.unlinkSync(deleteImagePath, (error) => {
          if(error) {
            next(error)
          } else {
            console.log("File Deleted")
          }
        });
      }


      const sql =
        "UPDATE vehicle SET vehicle_name= ?, vehicle_no= ?, vehicle_type= ?, vehicle_model= ?, engine_no= ?, chassis_no= ?, image_url= ? 	 WHERE vehicle_id = '" +
        id +
        "'";
      const [rows] = await sqlConnection.query(sql, vehicle_details);
      res.status(200).json({
        success: true,
        message: "edit successfull",
      });
    } catch (error) {
      next(error);
    }
  }
};

// change status
export const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sqlSelect = "SELECT * FROM vehicle WHERE vehicle_id = ?";
    const [row] = await sqlConnection.query(sqlSelect, [id]);
    const [vehicle] = row;

    let status = vehicle.status === 0 ? 1 : 0;

    const sqlUpdate =
      "UPDATE vehicle SET status = ? WHERE vehicle_id = '" + id + "'";
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

// search
export const search_vehicle_details = async (req, res, next) => {
  const { q } = req.query;
  try {
    const sql = "SELECT * FROM vehicle WHERE vehicle_name = '" + q + "' ";
    const [result] = await sqlConnection.query(sql);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

//view vehicle details
export const view_vehicle_details = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM vehicle WHERE vehicle_id = '" + id + "'";
    const [row] = await sqlConnection.query(sql);
    const [vehicle] = row;
    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    next(error);
  }
};

// json to sheet export
export const json_to_sheets = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM vehicle";
    const [data] = await sqlConnection.query(sql);

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "data_Sheet");
    xlsx.writeFile(workbook, "./excel-data/vehicleData.csv");
    const file = filePath + req.params.filename;
    res.download(file);
  } catch (error) {
    next(error);
  }
};

// import csv
export const import_csv_vehicle = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const import_path = filePathForImport + filename;
    addCsvToDb(import_path, "vehicle", next);
    res.status(200).json({
      success: true,
      message: "Data import success",
    });
  } catch (error) {
    next(error);
  }
};
