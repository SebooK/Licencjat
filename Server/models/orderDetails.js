const mongoose = require('mongoose');
const Joi = require('joi');
const OrderDetails = mongoose.model('OrderDetails',new mongoose.Schema({
    address: {
        type: String,
        required: true,
        minlength:5
    },
    companyName: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
    },
    deliverDate: {
        type: Date,
        required: true,
    },
}));

function validateOrderDetails(order) {
    const schema = {
        address: Joi.string().min(5).required(),
        companyName: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        deliverDate: Joi.date().required(),

    };
    return Joi.validate(order, schema);
}

exports.OrderDetails = OrderDetails;
exports.validate = validateOrderDetails;