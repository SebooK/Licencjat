import asyncHandler from "express-async-handler";
import express from "express";
import auth from "../middleware/auth";
import role from "../middleware/role";
import CustomerService from "../../services/customer_service";

const router = express.Router();

/* Customer Router */

router.get(
  "/:page",
  asyncHandler(async (req, res) => {
    const customer = await CustomerService.getCustomers();
    res.json({
      success: true,
      message: "Customers fetch successfully",
      data: customer,
    });
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { params } = req;
    const customer = await CustomerService.getCustomer(params.id);
    res.json({
      success: true,
      message: "Customer fetch successfully",
      data: customer,
    });
  })
);
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { body } = req;
    const customer = await CustomerService.createCustomer(body);
    res.json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  })
);
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { body } = req;
    const customer = await CustomerService.updateCustomer(body);
    res.json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  })
);

router.delete(
  "/:id",
  [auth, role],
  asyncHandler(async (req, res) => {
    const customerId = req.params.id;
    const customer = await CustomerService.deleteCustomer(customerId);
    res.json({
      success: true,
      message: "Customer deleted successfully",
      data: customer,
    });
  })
);

export default router;
