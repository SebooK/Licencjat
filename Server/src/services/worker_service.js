import { Op } from "sequelize";
import Worker from "../models/workers";
import { Order, Vehicle } from "../models";
import AuthService from "./auth_service";

export default class WorkerService {
  static async getWorker(id) {
    return Worker.findByPk(id);
  }

  static async getWorkerBy(propertyName, propertyValue) {
    return Worker.findOne({
      paramName: propertyValue,
    });
  }

  static async getWorkers() {
    return Worker.findAndCountAll({
      include: [
        {
          model: Vehicle,
          as: "vehicle",
        },
        {
          model: Order,
          as: "orders",
        },
      ],
    });
  }

  static async createWorker(workerData) {
    const { email, username } = workerData;

    const [worker, created] = await Worker.findOrCreate({
      where: {
        [Op.or]: [{ username }, { email }],
      },
      defaults: workerData,
    });
    if (created === true) {
      const authService = new AuthService(
        worker.id,
        worker.username,
        worker.password,
        worker.role
      );
      const authToken = authService.generateAuthToken();
      return { authToken, worker };
    }
    throw new Error("Worker already registered with this username or email");
  }

  static async updateWorker(data) {
    const { body, params } = data;
    const { username, email } = body;
    const result = await Worker.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (!result) {
      const worker = await Worker.findByPk(params.id);
      worker.update(body);
      const authService = new AuthService(
        worker.id,
        worker.username,
        worker.password,
        worker.role
      );
      const authToken = authService.generateAuthToken();
      return { authToken, worker };
    }
    throw new Error("Worker already registered with this username or email");
  }

  static async workerDelete(data) {
    const worker = await Worker.findByPk(data);
    if (!worker) {
      throw new Error("Worker not found");
    }
    worker.destroy();
    return worker.fullName;
  }

  static async getMyData(data) {
    try {
      return Worker.findByPk(data.worker.id, {
        include: [
          {
            model: Vehicle,
            as: "vehicle",
          },
          {
            model: Order,
            as: "orders",
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
