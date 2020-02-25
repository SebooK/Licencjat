const mongoose = require('mongoose');
const Joi = require('joi');
const Vehicle = mongoose.model('Vehicle',new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: true,
        minlength: 2
    }
}));

function validateVehicle(vehicleParam) {
    const schema = {
        registrationNumber: Joi.string().min(2).required(),
    };
    return Joi.validate(vehicleParam, schema);
}

exports.Vehicle = Vehicle;
exports.validate = validateVehicle();