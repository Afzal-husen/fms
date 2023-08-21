import express from "express";
import multer from "multer";
import { import_csv_vehicle } from "../controllers/vehicleController.js";
import { import_csv_driver } from "../controllers/driverController.js";
import { import_csv_fuel } from "../controllers/fuelController.js";
import { import_csv_income } from "../controllers/income-expense-controller.js";
import { import_csv_delivery } from "../controllers/productDeliveryController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "importedFiles/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  // import vehicle csv
router.post("/vehicle", upload.single("vehicleData"), import_csv_vehicle);

  // import driver csv
router.post("/driver", upload.single("driverData"), import_csv_driver);

  // import driver csv
  router.post("/fuel", upload.single("fuelData"), import_csv_fuel);

  // import income csv
  router.post("/income", upload.single("incomeData"), import_csv_income);

  // import delivery csv
  router.post("/delivery", upload.single("deliveryData"), import_csv_delivery);

export default router