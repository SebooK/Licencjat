import { User} from './user';

const mongoose = require('mongoose');
const Joi = require('joi');

const Order = mongoose.model('Order',new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        minlength: 1
    },
    cargo: {
        type:String,
        required: true,
        minlength: 1
    },
    carrier: User,
    vehicleStatus: {
        type: String,
        required: true,
        minlength: 1
    },
    creationDate: {
        type: Date
    },
    customer: {
        type: String,
        required: true,
        minlength: 1
    },
    loadingPlace: {
        type: String,
        required: true,
        minlength: 1,
    },
    placeOfUnloading: {
        type: String,
        required: true,
        minlength: 1
    },

}));

function validateOrders(order) {
    const schema = {
        orderNumber: Joi.string().min(5).required(),
        cargo: Joi.string().min(3).required(),
        carrier: Joi.string().min(3).required(),
        vehicleStatus: Joi.date().required(),
        customer: Joi.string().min(1).required(),
        loadingPlace: Joi.string().min(1).required(),
        placeOfUnloading: Joi.string().min(1).required()

    };
    return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrders;