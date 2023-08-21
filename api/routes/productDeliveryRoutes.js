import express from "express"
import { add_delivery_details, delete_delivery_detail, edit_delivery_detail, fetch_delivery_data, get_from_vehicle_driver } from "../controllers/productDeliveryController.js"

const router = express.Router()



// fetch vehicle and driver
router.get("/vehicle-driver", get_from_vehicle_driver)

// add product delivery detail
router.post("/add-delivery", add_delivery_details)

// fetch data
router.get("/fetch-delivery_data", fetch_delivery_data)

// edit  route
router.patch("/edit-delivery_detail/:id", edit_delivery_detail)

// delete delivery detail
router.delete("/delete-delivery_detail/:id", delete_delivery_detail)



export default router