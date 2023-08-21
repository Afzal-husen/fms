import express from "express";
import {
  add_driver_details,
  delete_driver_detail,
  edit_driver_detail,
  fetch_driver_details,
  json_to_sheets,
  updateStatus,
  view_driver_details,
} from "../controllers/driverController.js";

const router = express.Router();

// add driver details
router.post("/add-driver", add_driver_details);

// fetch driver details
router.get("/driver-details", fetch_driver_details);

// delete driver
router.delete("/delete-driver-detail/:id", delete_driver_detail);

// edit driver details
router.patch("/edit-driver-detail/:id", edit_driver_detail)

// edit status
router.patch("/update-status/:id", updateStatus)

// view driver details
router.get("/driver-details/:id", view_driver_details)

// json to sheets
router.get("/json-to-sheets/:filename", json_to_sheets)

export default router;
