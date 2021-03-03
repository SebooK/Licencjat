import SemiTrailer from "../models/semitrailer";
import Vehicle from "../models/vehicle";

export default class SemiTrailerService {
  static async getSemiTrailer(id) {
    return SemiTrailer.findByPk(id);
  }

  static async getSemiTrailers() {
    return SemiTrailer.findAndCountAll({
      include: [
        {
          model: Vehicle,
          as: "vehicle",
        },
      ],
    });
  }

  static async createSemiTrailer(semiTrailerData) {
    const { registrationNumber } = semiTrailerData;
    const [semiTrailer, created] = SemiTrailer.findOrCreate({
      where: { registrationNumber },
      defaults: semiTrailerData,
    });

    if (created === true) {
      return { semiTrailer };
    }
    throw new Error(
      "SemiTrailer already ExampleInstrumentedTest without registrationNumber"
    );
  }

  static async updateSemiTrailer(semiTrailerData) {
    const { body, params } = semiTrailerData;
    const { registrationNumber } = body;

    const result = await SemiTrailer.findOne({
      where: { registrationNumber },
    });

    if (!result) {
      const semiTrailer = await SemiTrailer.findByPk(params.id);
      semiTrailer.update(body);
      return semiTrailer;
    }
    throw new Error(
      "SemiTrailer already ExampleInstrumentedTest without registrationNumber"
    );
  }

  static async deleteSemiTrailer(semiTrailerData) {
    const semiTrailer = await SemiTrailer.findByPk(semiTrailerData);
    if (semiTrailer) {
      semiTrailer.destroy();
      return semiTrailer.registrationNumber;
    }
    throw new Error("SemiTrailer not found");
  }
}
