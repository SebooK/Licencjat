const Customer = require('../models').Customer;
const Order = require('../models').Order;

module.exports = {
    list(req,res) {
        return Customer
            .findAll( {
                include: [{
                    model:Order,
                    as:'order'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Order, as: 'order'}, 'createdAt', 'DESC'],
                ],
            })
            .then( (customer) => res.status(200).send(customer))
            .catch( (error) => {res.status(400).send(error);
            console.log(error)})
    },

    getById(req,res) {
        return Customer
            .findByPk(req.params.id, {
                include: [{
                    model:Order,
                    as: 'order'
                }],
            })
            .then( (customer) => {
                if(!customer) {
                    return res.status(400).send({
                        message:' Customer Not Found',
                    })
                }
                return res.status(200).send(customer)
            })
            .catch( (error) => {
                res.status(400).send({error: error});
                console.log(error);
            });
    },

    add(req,res) {
        return Customer
            .create({
                companyName: req.body.companyName,
                companyAddress: req.body.companyAddress,
                companyPhone: req.body.semiTrailerType,
            })
            .then((customer) => res.status(201).send(customer))
            .catch((error) => res.status(400).send(error));
    },

    update(req,res) {
        return Customer
            .findByPk(req.body.id, {
                include: [{
                    model:Order,
                    as:'order',
                }],
            })
            .then( customer => {
                if(!customer) {
                    return res.status(400).send({
                        message: 'Order Not Found'
                    })
                }
                return customer
                    .update({
                        companyName: DataTypes.STRING,
                        companyAddress: DataTypes.STRING,
                        companyPhone: DataTypes.STRING
                    })
                    .then( () => res.status(200).send(customer))
                    .catch( (error) => res.status(400).send(error));
            })
            .catch( (error) => res.status(400).send(error));
    },

    delete(req,res) {
        return Customer
            .findByPk(req.body.id)
            .then( customer => {
                if(!customer) {
                    return res.status(400).send({
                        message: 'Order Not Found'
                    })
                }
                return customer
                    .destroy()
                    .then( () => res.status(204).send())
                    .catch( (error) => res.status(400).send(error))
            })
            .catch( (error) => res.status(400).send(error));
    }
};