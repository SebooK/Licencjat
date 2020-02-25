const mongoose = require('mongoose');
const Joi = require('joi');
const SemiTrailer = mongoose.model('SemiTrailer',new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 2
    },
    registrationNumber: {
        type: String,
        required: true,
        minlength: 2
    }
}));

function validateSemiTrailer(SemiTrailerParam) {
    const schema = {
        type: Joi.string().min(2).required(),
        registrationNumber: Joi.string().min(2).required(),

    };
    return Joi.validate(SemiTrailerParam, schema);
}

exports.SemiTrailer = SemiTrailer;
exports.validate = validateSemiTrailer();