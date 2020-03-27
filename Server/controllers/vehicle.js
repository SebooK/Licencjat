const SemiTrailer = require('../models').SemiTrailer;
const Vehicle = require('../models').Vehicle;
const Worker = require('../models').Worker;


module.exports = {
    list(req,res) {
        return Vehicle
            .findAll( {
                include: [{
                    model: SemiTrailer,
                    as: 'semiTrailer',
                }, {
                    model: Worker,
                    as: 'worker',
                }
                ],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model:SemiTrailer, as:'semiTrailer'}, 'createdAt', 'DESC'],
                ],
            })
            .then( (vehicles) => res.status(200).send(vehicles))
            .catch( (error) => { res.status(400).send(error);})
    },

    getById(req,res) {
        return Vehicle
            .findByPk(req.params.id, {
                include: [{
                    model:SemiTrailer,
                    as: 'semiTrailer'
                }],
            })
            .then( (vehicle) => {
                if(!vehicle) {
                    return res.status(404).send({
                        message: 'Vehicle Not Found',
                    });
                }
                return res.status(200).send(vehicle);
            })
            .catch( (error) => res.status(400).send(error));
    },

    add(req,res) {
        return Vehicle
            .create({
                registrationNumber: req.body.registrationNumber,
                vehicleNumber: req.body.vehicleNumber,
                vehicleType: req.body.vehicleType,
                localization: req.body.localization,
                workerId: req.body.workerId,
            })
            .then( (vehicle) => res.status(201).send(vehicle))
            .catch( (error) => res.status(400).send(error));
    },

    update(req,res) {
        return Vehicle
            .findByPk(req.params.id, {
                include: [{
                    model: Vehicle,
                    as: 'vehicle',
                }],
        })
            .then( vehicle => {
                if(!vehicle) {
                    return res.status(404).send({
                        message: 'Vehicle Not Found'
                    });
                }
                return vehicle
                    .update({
                        registrationNumber: req.body.registrationNumber,
                        vehicleNumber: req.body.vehicleNumber,
                        vehicleType: req.body.vehicleType,
                        localization: req.body.localization,
                        workerId: req.body.workerId,
                    })
                    .then( () => res.status(200).send(vehicle))
                    .catch( (error) => res.status(400).send(error))
            })
            .catch( (error) => res.status(400).send(error));
    },

    delete(req,res) {
        return Vehicle
            .findByPk( req.params.id)
            .then( vehicle => {
                if(!vehicle) {
                    return res.status(400).send({
                        message: 'Vehicle Not Found'
                    })
                }
                return vehicle
                    .destroy()
                    .then( () => res.status(204).send())
                    .catch((error) => res.status(400).send(error))
            })
            .catch( (error) => res.status(400).send(error));
    }
};