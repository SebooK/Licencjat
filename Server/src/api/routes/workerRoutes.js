import asyncHandler from "express-async-handler";
import express from "express";
import WorkerService from "../../services/worker_service";
import { auth } from "../middleware/auth";
import role from "../middleware/role";

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await WorkerService.getWorker(req.params.id);

    res.send(user);
  })
);

/* Worker Router */

router.get(
  "/api/workers/me",
  auth,
  asyncHandler(async (req, res) => {
    try {
      const worker = req;
      const me = await WorkerService.getMyData(worker);
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
  "/api/workers/:page",
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
  "/api/worker/:id",
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
  "/api/workers",
  asyncHandler(async (req, res, next) => {
    const data = req.body;

    const workerData = await WorkerService.createWorker(data);

    const { token, worker } = workerData;
    res.set("x-auth-token", token).json({
      success: true,
      message: "User created Successfully",
      data: worker,
    });
  })
);

router.put(
  "/api/workers/:id",
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
  "/api/workers/:id",
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
