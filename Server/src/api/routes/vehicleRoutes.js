import asyncHandler from "express-async-handler";
import express from "express";
import auth from "../middleware/auth";
import role from "../middleware/role";
import VehicleService from "../../services/vehicle_service";

const router = express.Router();

router.get(
  "/:page",
  auth,
  asyncHandler(async (req, res) => {
    const vehicle = await VehicleService.getVehicles();
    res.json({
      success: true,
      message: "Vehicles fetch successfully",
      data: vehicle,
    });
  })
);

router.get(
  ":id",
  asyncHandler(async (req, res) => {
    const { params } = req;
    const vehicle = await VehicleService.getVehicle(params.id);
    res.json({
      success: true,
      message: "Vehicle fetch successfully",
      data: vehicle,
    });
  })
);
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { body } = req;
    const vehicle = await VehicleService.createVehicle(body);
    res.json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { body } = req;
    const vehicle = await VehicleService.updateVehicle(body);
    res.json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  })
);

router.delete(
  "/:id",
  [auth, role],
  asyncHandler(async (req, res) => {
    const vehicleId = req.params.id;
    const vehicle = await VehicleService.deleteVehicle(vehicleId);
    res.json({
      success: true,
      message: "Vehicle deleted successfully",
      data: vehicle,
    });
  })
);

export default router;
