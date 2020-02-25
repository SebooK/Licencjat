import { Vehicle } from "./vehicle";
import { SemiTrailer } from './semiTrailer';
import { User} from './user';

const mongoose = require('mongoose');
const Joi = require('joi');
const Vehicles = mongoose.model('Vehicles',new mongoose.Schema({
        vehicleType: {
            type: String,
            required: true,
            minlength: 1
        },
        vehicleLocalization: {

        },
        vehicle: Vehicle,
        semiTrailer: SemiTrailer,
        carrier: User,
    }));

function validateVehicles(vehiclesParam) {
    const schema = {
        vehicleType: Joi.string().min(5).required(),
        vehicleId: Joi.string().required(),
        semiTrailerId: Joi.string().required(),
        customerId: Joi.string().required()
    };
    return Joi.validate(vehiclesParam, schema);
}

exports.Vehicles = Vehicles;
exports.validate = validateVehicles();
