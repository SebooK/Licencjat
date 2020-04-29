const Worker = require('../models').Worker;
const Vehicle = require('../models').Vehicle;
const Order = require('../models').Order;
const _ = require('lodash');

const options = {
    offset: 0,
    limit: 15
};
module.exports = {
    list(req, res) {
        return Worker
            .findAndCountAll()
            .then(data => {
                let page = req.params.page;
                let pages = Math.ceil(data.count / options.limit);
                options.offset = options.limit * (page - 1);
                Worker.findAll({
                    include: [{
                        model: Vehicle,
                        as: 'vehicle'
                    }, {
                        model: Order,
                        as: 'orders'
                    }],
                    limit: options.limit,
                    offset: options.offset

                })
                    .then((worker) => res.status(200).json({'result': worker, 'count': data.count, 'pages': pages}))
                    .catch((error) => {
                        res.status(400).send(error);
                        console.log(error)
                    })
            })
            .catch(error => {
                res.status(500).send('Internal Server Error')
            });

    },

    getById(req, res) {
        return Worker
            .findByPk(req.params.id, {
                include: [{
                    model: Order,
                    as: 'orders'
                }],
            })
            .then((worker) => {
                if (!worker) {
                    return res.status(400).send({
                        message: ' Worker Not Found',
                    })
                }
                return res.status(200).send(worker)
            })
            .catch((error) => {
                res.status(400).send(error)
                console.log(error)
            });
    },

    async add(req, res) {
        let user = await Worker.findOne({
            where: {email: req.body.email}
        });
        let username = await Worker.findOne({
            where: {username: req.body.username}
        })
        if (user || username) {
            return res.status(400).json({errors: 'Worker already registered with this username or email'})
        } else {
            Worker
                .create({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    role: req.body.role
                })
                .then((worker) => {
                    const token = worker.generateAuthToken();
                    res
                        .set('x-auth-token', token)
                        .send(_.pick(worker, ['username', 'email', 'password']))
                })
                .catch((error) => {
                    res.status(400).send(error)
                    console.log(error);
                });
        }
    },

    async update(req, res) {
        let user = await Worker.findOne({
            where: {email: req.body.email}
        });
        let username = await Worker.findOne({
            where: {username: req.body.username}
        });
        if (user || username) {
            return res.status(400).json({errors: 'Worker already registered with this username or email'})
        } else {
            return Worker
                .findByPk(req.params.id)
                .then(worker => {
                    if (!worker) {
                        return res.status(400).send({
                            message: 'Worker Not Found'
                        })
                    }
                    return worker
                        .update({
                            username: req.body.username,
                            password: req.body.password,
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            role: req.body.role
                        })
                        .then((worker) => {
                            const token = worker.generateAuthToken();
                            console.log(token);
                            ;res
                                .set('x-auth-token', token)
                                .send(_.pick(worker, ['username', 'email', 'password']));

                        })
                        .catch((error) => {
                                res.status(400).send(error);
                                console.log(error)
                            }
                        );
                })
                .catch((error) => {
                    res.status(400).send(error);
                    console.log(error)
                });
        }
    },

    delete(req, res) {
        return Worker
            .findByPk(req.params.id)
            .then(worker => {
                if (!worker) {
                    return res.status(400).send({
                        message: 'Worker Not Found'
                    })
                }
                return worker
                    .destroy()
                    .then(() => res.status(204).send('User deleted'))
                    .catch((error) => {
                        res.status(400).send(error)
                        console.log(error)
                    })
            })
            .catch((error) => {
                res.status(400).send(error)
                console.log(error)
            });
    },
    async getUserData(req, res) {
        return Worker
            .findByPk(req.worker.id, {
                attributes: {
                    exclude: ['password']
                }
            })
            .then(worker => {
                return res.status(200).send(worker);
            })
            .catch(error => {
                console.log(error);
                return res.status(400).send(error);

            })
    }

};