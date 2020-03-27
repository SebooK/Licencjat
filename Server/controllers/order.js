const Worker = require('../models').Worker;
const Customer = require('../models').Customer;
const Order = require('../models').Order;

module.exports = {
    list(req,res) {
        return Order
            .findAll( {
                include: [{
                    model:Customer,
                    as:'customer'

                },{
                    model:Order,
                    as:'order',
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Order, as: 'order'}, 'createdAt', 'DESC'],
                ],
            })
            .then( (order) => res.status(200).send(order))
            .catch( (error) => {res.status(400).send(error);})
    },

    getById(req,res) {
        return Order
            .findByPk(req.params.id, {
                include: [{
                    model:Customer,
                    as: 'customer'
                }],
            })
            .then( (order) => {
                if(!order) {
                    return res.status(400).send({
                        message:' Order Not Found',
                    })
                }
                return res.status(200).send(order)
            })
            .catch( (error) => res.status(400).send(error));
    },

    add(req,res) {
        return Order
            .create({
                workerId: req.body.worker,
                orderNumber: req.body.orderNumber,
                cargo: req.body.cargo,
                vehicle: req.body.vehicle,
                customerId:req.body.customerId,
                loadingPlace: req.body.loadingPlace,
                unloadingPlace: req.body.unloadingPlace
            })
            .then( (order) => res.status(201).send(order))
            .catch((error) => res.status(400).send(error));
    },

    update(req,res) {
        return Order
            .findByPk(req.body.id, {
                include: [{
                    model:Customer,
                    as:'customer',
                }],
            })
            .then( order => {
                if(!order) {
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
                        customerId:req.body.customerId,
                        loadingPlace: req.body.loadingPlace,
                        unloadingPlace: req.body.unloadingPlace
                    })
                    .then( () => res.status(200).send(order))
                    .catch( (error) => res.status(400).send(error));
            })
            .catch( (error) => res.status(400).send(error));
    },

    delete(req,res) {
        return Order
            .findByPk(req.body.id)
            .then( order => {
                if(!order) {
                    return res.status(400).send({
                        message: 'Order Not Found'
                    })
                }
                return order
                    .destroy()
                    .then( () => res.status(204).send())
                    .catch( (error) => res.status(400).send(error))
            })
            .catch( (error) => res.status(400).send(error));
    }
};