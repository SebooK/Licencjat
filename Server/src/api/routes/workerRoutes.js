import asyncHandler from "express-async-handler";
import { Router } from "express";
import WorkerService from "../../services/worker_service";
import auth from "../middleware/auth";
import role from "../middleware/role";

const router = Router();

/* Worker Router */

router.get(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const { worker } = req;
      const me = await WorkerService.getMyData(worker.id);
      res.json({
        success: true,
        message: "Your information fetch successfully",
        data: me,
      });
    } catch (e) {
      throw new Error(e);
    }
  })
);
router.get(
  "/:page",
  asyncHandler(async (req, res) => {
    const workers = await WorkerService.getWorkers();
    res.json({
      success: true,
      message: "Users fetch successfully",
      data: workers,
    });
  })
);
router.get(
  "/worker/:id",
  asyncHandler(async (req, res) => {
    const data = req.params.id;
    const worker = await WorkerService.getWorker(data);
    res.json({
      success: true,
      message: "User fetch successfully",
      data: worker,
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = req.body;

    const workerData = await WorkerService.createWorker(data);
    const { authToken, worker } = workerData;
    res.set("Authorization", authToken).json({
      success: true,
      message: "User created Successfully",
      data: worker,
      authToken,
    });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { body, params } = req;

    const workerData = await WorkerService.updateWorker({ body, params });
    const { authToken, worker } = workerData;
    res.set("x-auth-token", authToken).json({
      success: true,
      message: "User updated Successfully",
      data: { worker, authToken },
    });
  })
);
router.delete(
  "/:id",
  [auth, role],
  asyncHandler(async (req, res) => {
    const workerId = req.params.id;
    const worker = await WorkerService.workerDelete(workerId);
    res.json({
      success: true,
      message: "User deleted Successfully",
      data: worker,
    });
  })
);
export default router;
