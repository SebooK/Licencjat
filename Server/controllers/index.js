const order = require('./order.js');
const worker = require('./worker.js');
const customer = require('./customer.js');
const vehicle = require('./vehicle.js');
const semiTrailer = require('./semiTrailer.js');
const auth = require('./auth.js');

module.exports = {
    order,
    worker,
    customer,
    vehicle,
    semiTrailer,
    auth,
}