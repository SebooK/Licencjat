const Worker = require('../models').Worker;
const Vehicle = require('../models').Vehicle;
const Order = require('../models').Order;
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const auth = require('../middleware/auth.js');
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
            .catch( (error) => {res.status(400).send(error); console.log(error)})
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
        let user = await Worker.findOne({
            where: {email:req.body.email}
        });
        let username = await Worker.findOne({
            where: {username:req.body.username}
        })
        if(user || username) {return res.status(400).json({errors:'Worker already registered with this username or email'})}
        else {

                    Worker
                        .create({
                                username: req.body.username,
                                password:req.body.password,
                                email:req.body.email,
                                firstname:req.body.firstname,
                                lastname:req.body.lastname,
                                role:req.body.role
                        })
                        .then((worker) => {
                                const token = worker.generateAuthToken();
                                res
                                    .set('x-auth-token',token)
                                    .send(_.pick(worker, ['username','email','password']))
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
            .findByPk(req.params.id)
            .then( worker => {
                if(!worker) {
                    return res.status(400).send({
                        message: 'Worker Not Found'
                    })
                }
                return worker
                    .destroy()
                    .then( () => res.status(204).send('User deleted'))
                    .catch( (error) => res.status(400).send(error))
            })
            .catch( (error) => res.status(400).send(error));
    },
    async getUserData(req,res) {
       return Worker
           .findByPk(req.worker.id, {
               attributes: {
                   exclude: ['password']
               }
           })
           .then( worker => {
                    return res.status(200).send(worker);
           })
           .catch(error => { return res.status(400).send(error);

           })
    }

};