import express from "express"
import { add_income_expense, delete_income_expense_detail, edit_income_expense_detail, fetch_all_income_expenses, json_to_sheets } from "../controllers/income-expense-controller.js"
import { get_from_vehicle_driver } from "../controllers/productDeliveryController.js"

const router = express.Router()

// add income-expense
router.post("/add", add_income_expense)

// fetch all income-expenses
router.get("/fetch-all", fetch_all_income_expenses) 

// delete detail
router.delete("/delete-detail/:id", delete_income_expense_detail)

// edit details
router.patch("/income-expense-edit/:id", edit_income_expense_detail)

// json to sheets
router.get("/json-to-sheets/:filename", json_to_sheets)

// fetch vehicle and driver
router.get("/vehicle-driver", get_from_vehicle_driver)

export default router