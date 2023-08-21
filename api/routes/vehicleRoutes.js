import express from "express";
import multer from "multer";

import {
  add_vehicle,
  delete_vehicle_detail,
  edit_vehicle_detail,
  fetch_vehicle_details,
  json_to_sheets,
  search_vehicle_details,
  updateStatus,
  view_vehicle_details,
} from "../controllers/vehicleController.js";
import { CustomError } from "../middleware/customError.js";

const DIR = "./vehicleImages/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb, next) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/svg" ||
      file.mimetype === "image/avif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return new Error(403, "Only Image Files Allowed");
    }
  },
});

const router = express.Router();

// add vehicle
router.post("/add-vehicle", upload.single("vehicleImage"), add_vehicle);

// fetch vehicle details
router.get("/vehicle-details", fetch_vehicle_details);

// delete vehicle detail
router.delete("/delete-vehicle-detail/:id", delete_vehicle_detail);

// edit vehicle details
router.patch(
  "/edit-vehicle-detail/:id",
  upload.single("vehicleEditImage"),
  edit_vehicle_detail
);

// edit status
router.patch("/update-status/:id", updateStatus);

// search
router.get("/search-vehicle", search_vehicle_details);

// view vehicle details
router.get("/vehicle-details/:id", view_vehicle_details);

// json to sheets
router.get("/json-to-sheets/:filename", json_to_sheets);

export default router;
