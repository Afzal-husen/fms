import express from "express"
import { add_fuel, edit_fuel_detail, fetch_fuel_details, fuel_detail_delete, json_to_sheets, updateStatus, view_fuel_details } from "../controllers/fuelController.js"

const router = express.Router()

// add fuel
router.post("/add", add_fuel)

// fetch fuel details
router.get("/fuel-details", fetch_fuel_details)

// delete fuel detail
router.delete("/fuel-detail-delete/:id", fuel_detail_delete)

// edit fuel detail
router.patch("/fuel-edit/:id", edit_fuel_detail)

// change status
router.patch("/update-status/:id", updateStatus)

// view fuel details
router.get("/fuel-details/:id", view_fuel_details)

// json to sheets
router.get("/json-to-sheets/:filename", json_to_sheets)

export default router 