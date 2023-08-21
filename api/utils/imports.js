import { sqlConnection } from "../connectDB.js";
import crypto from "crypto";

export const import_vehicle = (dataArr) => {
  // filter from duplicates in csv
  dataArr = dataArr.filter((obj, index) => {
    if (
      dataArr.findIndex((item) => item.vehicle_no === obj.vehicle_no) === index
    ) {
      return (
        dataArr.findIndex((item) => item.vehicle_no === obj.vehicle_no) ===
        index
      );
    }
    if (
      dataArr.findIndex((item) => item.engine_no === obj.engine_no) === index
    ) {
      return (
        dataArr.findIndex((item) => item.engine_no === obj.engine_no) === index
      );
    }
    if (
      dataArr.findIndex((item) => item.chassis_no === obj.chassis_no) === index
    ) {
      return (
        dataArr.findIndex((item) => item.chassis_no === obj.chassis_no) ===
        index
      );
    }
  });

  dataArr.forEach(async (obj) => {
    const vehicle_no_sql =
      "SELECT * FROM vehicle WHERE vehicle_no= '" + obj.vehicle_no + "'";
    const engine_no_sql =
      "SELECT * FROM vehicle WHERE engine_no= '" + obj.engine_no + "'";
    const chassis_no_sql =
      "SELECT * FROM vehicle WHERE chassis_no= '" + obj.chassis_no + "'";
    const [vehicle_no] = await sqlConnection.query(vehicle_no_sql);
    const [engine_no] = await sqlConnection.query(engine_no_sql);
    const [chassis_no] = await sqlConnection.query(chassis_no_sql);

    if (
      vehicle_no.length === 0 &&
      engine_no.length === 0 &&
      chassis_no.length === 0
    ) {
      if (obj.vehicle_id) {
        delete obj.vehicle_id;
      }
      const objValues = Object.values(obj);
      if (obj.sr) {
        objValues.shift();
      }
      const id = crypto.randomBytes(10).toString("hex");
      const sql =
        "INSERT INTO vehicle (vehicle_id, vehicle_name, vehicle_no, vehicle_type, vehicle_model, engine_no, chassis_no, status) VALUES('" +
        id +
        "',?,?,?,?,?,?,?)";
      await sqlConnection.query(sql, objValues);
    }
  });
};

// driver
export const import_driver = (dataArr) => {
  dataArr = dataArr.filter((obj, index) => {
    if (dataArr.findIndex((item) => item.mobile === obj.mobile) === index) {
      return dataArr.findIndex((item) => item.mobile === obj.mobile) === index;
    }
    if (
      dataArr.findIndex((item) => item.license_no === obj.license_no) === index
    ) {
      return (
        dataArr.findIndex((item) => item.license_no === obj.license_no) ===
        index
      );
    }
  });

  // console.log(dataArr)

  dataArr.map(async (obj) => {
    const mobile_sql =
      "SELECT * FROM driver WHERE mobile = '" + obj.mobile + "'";
    const license_no_sql =
      "SELECT * FROM driver WHERE license_no = '" + obj.license_no + "'";
    const [mobile] = await sqlConnection.query(mobile_sql);
    const [license_no] = await sqlConnection.query(license_no_sql);

    if (mobile.length === 0 && license_no.length === 0) {
      if (obj.id) {
        delete obj.id;
      }
      const exp_date = obj.license_exp;
      // license_exp
      const date_sql = "SELECT ADDDATE('" + exp_date + "', INTERVAL 0 YEAR)";
      const [row] = await sqlConnection.query(date_sql);
      const [resp] = row;
      const dateObj = Object.values(resp);
      const [dateVal] = dateObj;
      //joinin date
      const join_date_sql = "SELECT CURRENT_DATE()";
      const [rowArr] = await sqlConnection.query(join_date_sql);
      const [response] = rowArr;
      const curr_date = Object.values(response);
      const [curr_dateVal] = curr_date;
      obj.license_exp = dateVal;
      obj.joining_date = curr_dateVal;
      const objValues = Object.values(obj);
      console.log(objValues);
      if (obj.sr) {
        objValues.shift();
      }
      console.log(obj);
      const id = crypto.randomBytes(10).toString("hex");
      const sql =
        "INSERT INTO driver (id, name, mobile, license_no, license_exp, joining_date) VALUES ('" +
        id +
        "', ?, ?, ?, ?, ?)";
      await sqlConnection.query(sql, objValues);
    }
  });
};

// fuel
export const import_fuel = (dataArr) => {
  dataArr.forEach(async (obj) => {
    if (obj.id) {
      delete obj.id;
    }
    const fuel_fill_date = obj.fuel_fill_date;
    // add fuel date
    const date_sql =
      "SELECT ADDDATE('" + fuel_fill_date + "', INTERVAL 0 YEAR)";
    const [row] = await sqlConnection.query(date_sql);
    const [dateObj] = row;
    const date_val = Object.values(dateObj)[0];
    obj.fuel_fill_date = date_val;
    const objValues = Object.values(obj);

    if (obj.sr) {
      objValues.shift();
    }

    const id = crypto.randomBytes(10).toString("hex");
    const sql =
      "INSERT INTO fuel (id, vehicle_name, vehicle_no, fuel_filled_by, license_no,  fuel_fill_date, quantity, fuel_total_price, odometer) VALUES ('" +
      id +
      "',?,?,?,?,?,?,?,?)";
    await sqlConnection.query(sql, objValues);
  });
};

// income
export const import_income_expense = (dataArr) => {
  dataArr.forEach(async (obj) => {
    if (obj.id) {
      delete obj.id;
    }
    const add_date_sql = "SELECT CURRENT_DATE()";
    const [rowArr] = await sqlConnection.query(add_date_sql);
    const [response] = rowArr;
    const curr_date = Object.values(response);
    const [curr_dateVal] = curr_date;
    obj.add_date = curr_dateVal;
    const objValues = Object.values(obj);
    if (obj.sr) {
      objValues.shift();
    }
    const id = crypto.randomBytes(10).toString("hex");
    const sql =
      "INSERT INTO income_expense (id, vehicle_name, vehicle_no, driver_name, license_no, add_date, description, amount, type) VALUES ('" +
      id +
      "',?,?,?,?,?,?,?,?)";
    await sqlConnection.query(sql, objValues);
  });
};

// import delivery
export const import_delivery = (dataArr) => {
  dataArr.forEach(async (obj) => {
    if (obj.product_id) {
      delete obj.product_id;
    }
    const objValues = Object.values(obj);
    if (obj.sr) {
      objValues.shift();
    }
    const id = crypto.randomBytes(10).toString("hex");
    const sql =
      "INSERT INTO product_delivery (product_id, product_name, product_price, vehicle_name, vehicle_no, driver_name, license_no, dispatch_add, del_add, del_distance) VALUES ('" +
      id +
      "',?,?,?,?,?,?,?,?,?)";
    await sqlConnection.query(sql, objValues);
  });
};
