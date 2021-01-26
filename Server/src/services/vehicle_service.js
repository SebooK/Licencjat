import { Op } from "sequelize";
import Worker from "../models/workers";
import Vehicle from "../models/vehicle";
import SemiTrailer from "../models/semitrailer";

export default class VehicleService {
  static async getVehicle(id) {
    return Vehicle.findByPk(id);
  }

  static async getVehicleBy(propertyName, propertyValue) {
    return Vehicle.findOne({
      propertyName: propertyValue,
    });
  }

  static async getVehicles() {
    return Vehicle.findAndCountAll({
      include: [
        {
          model: Worker,
          as: "worker",
        },
        {
          model: SemiTrailer,
          as: "semiTrailer",
        },
      ],
    });
  }

  static async createVehicle(vehicleData) {
    const { registrationNumber, vehicleNumber } = vehicleData;

    const [vehicle, created] = await Vehicle.findOrCreate({
      where: {
        [Op.or]: [{ registrationNumber }, { vehicleNumber }],
      },
      defaults: vehicleData,
    });
    if (created === true) {
      return { vehicle };
    }
    throw new Error(
      "Vehicle already exists with registrationNumber or vehicleNumber"
    );
  }

  static async updateVehicle(data) {
    const { body, params } = data;
    const { registrationNumber, vehicleNumber } = body;
    const result = await Vehicle.findOne({
      where: {
        [Op.or]: [{ registrationNumber }, { vehicleNumber }],
      },
    });
    if (!result) {
      const vehicle = await Vehicle.findByPk(params.id);
      vehicle.update(body);
      return vehicle;
    }
    throw new Error(
      "Vehicle already exists with registrationNumber or vehicleNumber"
    );
  }

  static async deleteVehicle(data) {
    const vehicle = await Vehicle.findByPk(data);
    if (vehicle) {
      vehicle.destroy();
      return vehicle.registrationNumber;
    }
    throw new Error("Vehicle not found");
  }
}
