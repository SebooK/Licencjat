const mongoose = require('mongoose');
const Joi = require('joi');
const User = mongoose.model('User',new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength:5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}));

function validateUsers(user) {
    const schema = {
        userName: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        type: Joi.string().min(3).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate= validateUsers;