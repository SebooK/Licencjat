import express from "express";
import asyncHandler from "express-async-handler";
import OrderService from "../../services/order_service";
import auth from "../middleware/auth";
import role from "../middleware/role";

const router = express.Router();

/* Orders Router */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const orders = await OrderService.getOrders();
    res.json({
      success: true,
      message: "Orders fetch successfully",
      data: orders,
    });
  })
);
router.get("/:id", async (req, res) => {
  const { params } = req;
  const order = await OrderService.getOrders(params.id);
  res.json({
    success: true,
    message: "Order fetch successfully",
    data: order,
  });
});
router.post("/", auth, async (req, res) => {
  const { body } = req;
  const order = await OrderService.createOrder(body);
  res.json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
});
router.put("/:id", async (req, res) => {
  const { body } = req;
  const order = await OrderService.updateOrder(body);
  res.json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
});
router.delete("/:id", [auth, role], async (req, res) => {
  const { params } = req;
  const order = await OrderService.deleteOrder(params.id);
  res.json({
    success: true,
    message: "Order deleted successfully",
    data: order,
  });
});

export default router;
