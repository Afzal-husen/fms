import mysql from "mysql2/promise";

export const sqlConnection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fleet_management_system",
  multipleStatements: true,
});

const connectDB = async () => {
  try {
    await sqlConnection.connect();
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
