dotenv.config();
import express from "express";
import connectDB from "./connectDB.js";
import userRouter from "./routes/userRoutes.js";
import vehicleRouter from "./routes/vehicleRoutes.js";
import driverRouter from "./routes/driverRoutes.js";
import fuelRouter from "./routes/fuelRoutes.js";
import importRouter from "./routes/importRoutes.js";
import incomeExpenseRouter from "./routes/income-expense-routes.js";
import deliveryRouter from "./routes/productDeliveryRoutes.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path, { dirname } from "path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// path for file export
export const filePath = __dirname + "/excel-data/";
export const filePathForImport = __dirname + "/importedFiles/";
export const filePathForJsonData = __dirname + "/jsonData/";
export const vehicleImagesPath = __dirname + "/vehicleImages/";
process.setMaxListeners(0);

// import session from "express-session"

const app = express();

// session
// app.use(session({
//   secret: "afzal",
//   saveUninitialized: true,
//   cookie: {maxAge: 1000 * 60 * 60 * 24},
//   resave: true
// }))

// cors option
const corsOption = {
  origin: true,
  credentials: true,
};

// app.use('/public/vehicleImages',express.static('vehicleImages'))
const vehicleImages = __dirname + "/vehicleImages";
app.use("/vehicleImages", express.static(vehicleImages));

// helmet
app.use(helmet());

// cors
app.use(cors(corsOption));

// json parser
app.use(express.json());

app.use(cookieParser());

// routes
app.use("/api", userRouter);
app.use("/api/vehicle", vehicleRouter);
app.use("/api/driver", driverRouter);
app.use("/api/fuel", fuelRouter);
app.use("/api/income-expense", incomeExpenseRouter);
app.use("/api/import_csv", importRouter);
app.use("/api", deliveryRouter);

// middleware
app.use(errorHandler);

// start server
const start = () => {
  connectDB();
  app.listen(5000, console.log("server running a port 5000"));
};

start();
