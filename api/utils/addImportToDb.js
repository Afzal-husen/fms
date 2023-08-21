import fs from "fs";
import csv from "fast-csv";

import { import_delivery, import_driver, import_fuel, import_income_expense, import_vehicle } from "./imports.js";
import { sqlConnection } from "../connectDB.js";

export const addCsvToDb = (path, type, next) => {
  const dataArr = [];
  const stream = fs.createReadStream(path);
  const fileStream = csv
    .parse({ headers: true })
    .on("data", function (data) {
      dataArr.push(data);
    })
    .on("end", async (rowCount) => {
      if(type === "vehicle") {
          import_vehicle(dataArr)
      }
      if(type === "driver") {
        import_driver(dataArr)
      }
      if(type === "fuel") {
        import_fuel(dataArr)
      }
      if(type === "income") {
        import_income_expense(dataArr)
      }
      if(type === "delivery") {
        import_delivery(dataArr)
      }
    });
  stream.pipe(fileStream);
};
