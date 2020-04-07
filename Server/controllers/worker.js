const Worker = require('../models').Worker;
const Vehicle = require('../models').Vehicle;
const Order = require('../models').Order;
const {check, validationResult} = require('express-validator');
const _ = require('lodash');
module.exports = {
    list(req,res) {
        return Worker
            .findAll( {
                include:[{
                    model: Vehicle,
                    as:'vehicle'
                },{
                    model: Order,
                    as: 'orders'
                }
                ]
            })
            .then( (worker) => res.status(200).send(worker))
            .catch( (error) => {res.status(400).send(error);})
    },

    getById(req,res) {
        return Worker
            .findByPk(req.params.id, {
                include: [{
                    model:Order,
                    as: 'orders'
                }],
            })
            .then( (worker) => {
                if(!worker) {
                    return res.status(400).send({
                        message:' Worker Not Found',
                    })
                }
                return res.status(200).send(worker)
            })
            .catch( (error) => {res.status(400).send(error)
            console.log(error)
            });
    },

     async add(req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).send({errors: errors.array()});
        }
        let user = await Worker.findOne({where:{email:req.body.email}});
        if(user) {return res.status(400).json({errors:'Worker already registered on this email: '+ user.email})}
        else {
             Worker
                 .create(_.pick(req.body, ['username', 'password', 'email', 'firstname','lastname','role'])
                )
                .then((worker) => {
                    res.status(201).send(_.pick(worker, ['username','email']))
                })
                .catch((error) => res.status(400).send(error));
        }
    },

    update(req,res) {
        return Worker
            .findByPk(req.body.id, {
                include: [{
                    model:Worker,
                    as:'worker',
                }],
            })
            .then( worker => {
                if(!worker) {
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
                    .then( () => res.status(200).send(worker))
                    .catch( (error) => res.status(400).send(error));
            })
            .catch( (error) => res.status(400).send(error));
    },

    delete(req,res) {
        return Worker
            .findByPk(req.body.id)
            .then( worker => {
                if(!worker) {
                    return res.status(400).send({
                        message: 'Worker Not Found'
                    })
                }
                return worker
                    .destroy()
                    .then( () => res.status(204).send())
                    .catch( (error) => res.status(400).send(error))
            })
            .catch( (error) => res.status(400).send(error));
    }
};