const Worker = require('../models').Worker;
const Customer = require('../models').Customer;
const Order = require('../models').Order;
const options = {
    offset: 0,
    limit: 15
};


module.exports = {
    list(req, res) {
        return Order
            .findAndCountAll()
            .then(data => {
                let page = req.param.page;
                let pages = Math.ceil(data.count / options.limit);
                options.offset = options.limit * (page - 1);
                Order
                    .findAll({
                        include: [{
                            model: Customer,
                            as: 'customer',
                        }, {
                            model: Worker,
                            as: 'worker'
                        }
                        ],
                        order: [
                            ['createdAt', 'DESC'],
                            [{model: Customer, as: 'customer'}, 'createdAt', 'DESC'],
                        ],
                    })
                    .then((order) => {
                        if (!order) {
                            return res.status(400).send({
                                message: ' Order List is Empty',
                            })
                        }
                        return res.status(200).send({'result': order, 'count': data.count, 'pages': pages})
                    })
                    .catch((error) => {
                        res.status(400).json({error: error});
                        console.log(error)
                    });
            })
            .catch(error => res.status(500).send(error));
    },

    getById(req, res) {
        return Order
            .findByPk(req.params.id, {
                include: [{
                    model: Customer,
                    as: 'customer'
                }],
            })
            .then((order) => {
                if (!order) {
                    return res.status(400).send({
                        message: ' Order Not Found',
                    })
                }
                return res.status(200).send(order)
            })
            .catch((error) => res.status(400).send(error));
    }
    ,

    add(req, res) {
        return Order
            .create({
                workerId: req.body.workerId,
                orderNumber: req.body.orderNumber,
                cargo: req.body.cargo,
                vehicle: req.body.vehicle,
                customerId: req.body.customerId,
                loadingPlace: req.body.loadingPlace,
                unloadingPlace: req.body.unloadingPlace
            })
            .then((order) => res.status(201).send(order))
            .catch((error) => res.status(400).send(error));
    }
    ,

    update(req, res) {
        return Order
            .findByPk(req.params.id, {
                include: [{
                    model: Customer,
                    as: 'customer',
                }],
            })
            .then(order => {
                if (!order) {
                    return res.status(400).send({
                        message: 'Order Not Found'
                    })
                }
                return order
                    .update({
                        workerId: req.body.worker,
                        orderNumber: req.body.orderNumber,
                        cargo: req.body.cargo,
                        vehicle: req.body.vehicle,
                        customerId: req.body.customerId,
                        loadingPlace: req.body.loadingPlace,
                        unloadingPlace: req.body.unloadingPlace
                    })
                    .then(() => res.status(200).send(order))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
    ,

    delete(req, res) {
        return Order
            .findByPk(req.params.id)
            .then(order => {
                if (!order) {
                    return res.status(400).send({
                        message: 'Order Not Found'
                    })
                }
                return order
                    .destroy()
                    .then(() => res.status(204).send({
                        message: "Order deleted"
                    }))
                    .catch((error) => res.status(400).send(error))
            })
            .catch((error) => res.status(400).send(error));
    }
};
