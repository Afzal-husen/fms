import { sqlConnection } from "../connectDB.js";
import { CustomError } from "../middleware/customError.js";
import crypto from "crypto";
import { filePath, filePathForImport } from "../index.js";
import xlsx from "xlsx"
import { addCsvToDb } from "../utils/addImportToDb.js";



// add income-expenses
export const add_income_expense = async (req, res, next) => {
  const { vehicle_no, license_no, description, amount, type } = req.body;
  const id = crypto.randomBytes(10).toString("hex");

  if (!vehicle_no || !license_no || !description || !amount || !type)
    return next(new CustomError(400, "All fields are required"));

  try {
    const add_date_sql = "SELECT CURRENT_DATE()";
    const [rowArr] = await sqlConnection.query(add_date_sql);
    const [response] = rowArr;
    const curr_date = Object.values(response);
    const [curr_dateVal] = curr_date;

    const [r1] = await sqlConnection.query("select vehicle_name from vehicle where vehicle_no= '"+vehicle_no+"'")
    const vehicle_name = r1[0].vehicle_name

    const [r2] = await sqlConnection.query("select name from driver where license_no= '"+license_no+"'")
    const driver_name = r2[0].name

    const details = [id, vehicle_name, vehicle_no, driver_name, license_no, curr_dateVal, description, amount, type];
    const sql =
      "INSERT INTO income_expense (id, vehicle_name, vehicle_no, driver_name, license_no, add_date, description, amount, type) VALUES (?,?,?,?,?,?,?,?,?)";
    await sqlConnection.query(sql, details);

    res.status(200).json({
      success: true,
      message: "income/expense details added",
    });
  } catch (error) {
    next(error);
  }
};


// fetch all income/expenses
export const fetch_all_income_expenses = async (req, res, next) => {
    try {
        const rowCountSql = "SELECT count(*) as numRows FROM income_expense";
        const [rows] = await sqlConnection.query(rowCountSql);
        const numRows = rows[0];
        const sql = "SELECT * FROM income_expense"
        const [data] = await sqlConnection.query(sql)
        if(data.length !== 0 ) {
            res.status(200).json({
                success: true,
                data,
                numRows
            })
        } else {
            res.status(200).json({
                empty: true,
                message: "No income/expense data detail found"
            })
        }
    } catch (error) {
        next(error)
    }
}

// delete income detail
export const delete_income_expense_detail = async (req, res, next) => {
    const { id } = req.params;
    try {
      const sql = "DELETE FROM income_expense WHERE id =  ?";
      await sqlConnection.query(sql, [id]);
      res.status(200).json({
        success: true,
        message: "delete successfull",
      });
    } catch (error) {
      next(error);
    }
  };

  // edit a income detail
export const edit_income_expense_detail = async (req, res, next) => {
    const { id } = req.params;
    const {  vehicle_no, license_no, description, amount, type } = req.body;
  
    if (!vehicle_no || !description || !amount || !type)
    return next(new CustomError(400, "All fields are required"));
  
    const add_date_sql = "SELECT CURRENT_DATE()";
    const [rowArr] = await sqlConnection.query(add_date_sql);
    const [response] = rowArr;
    const curr_date = Object.values(response);
    const [curr_dateVal] = curr_date;
  
    
    try {
      const [r1] = await sqlConnection.query("select vehicle_name from vehicle where vehicle_no= '"+vehicle_no+"'")
      const vehicle_name = r1[0].vehicle_name
  
      const [r2] = await sqlConnection.query("select name from driver where license_no= '"+license_no+"'")
      const driver_name = r2[0].name

      const details = [ vehicle_name, vehicle_no, driver_name, license_no, curr_dateVal, description, amount, type];
      
      const sql =
      "UPDATE income_expense SET vehicle_name= ?, vehicle_no= ?, driver_name= ?, license_no= ?, add_date= ?, description= ?, amount= ?, type= ? WHERE id = '" +
        id +
        "'";
      const [rows] = await sqlConnection.query(sql, details);
      res.status(200).json({
        success: true,
        message: "edit successfull",
      });
    } catch (error) {
      next(error);
    }
  };


  // json to sheet
export const json_to_sheets = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM income_expense"
    const [data] = await sqlConnection.query(sql)
    
    const worksheet = xlsx.utils.json_to_sheet(data)
    const workbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workbook, worksheet, "data_Sheet")
    xlsx.writeFile(workbook, './excel-data/income-expenseData.csv')
    const file = filePath + req.params.filename
    res.download(file)
  } catch (error) {
    next(error)
  }
}

// import csv
export const import_csv_income = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const import_path = filePathForImport + filename;
    addCsvToDb(import_path,  "income");
    res.status(200).json({
      success: true,
      message: "Data import success",
    });
  } catch (error) {
    next(error);
  }
};