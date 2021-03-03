import express from "express";
import vehicleRoutes from "./vehicleRoutes";
import workerRoutes from "./workerRoutes";
import customerRoutes from "./customerRoutes";
import orderRoutes from "./orderRoutes";
import authRoutes from "./authRoutes";

const apiRoute = express.Router();

apiRoute.use(express.json());
apiRoute.use("/workers", workerRoutes);
apiRoute.use("/vehicles", vehicleRoutes);
apiRoute.use("/customers", customerRoutes);
apiRoute.use("/orders", orderRoutes);
apiRoute.use(authRoutes);
export default apiRoute;
