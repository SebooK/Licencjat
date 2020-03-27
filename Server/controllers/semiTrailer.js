const SemiTrailer = require('../models').SemiTrailer;
const Vehicle = require('../models').Vehicle;

module.exports =  {
    list(req,res) {
        return SemiTrailer
            .findAll( {
                include: [{
                    model:Vehicle,
                    as: 'vehicle'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model:Vehicle, as: 'vehicle'}, 'createdAt', 'DESC'],
                ],
            })
            .then((semitrailers) => res.status(200).send(semitrailers))
            .catch((error) => {res.status(400).send(error);})
    },
    getById(req,res) {
        return SemiTrailer
            .findByPk(req.params.id, {
                include: [{
                    model: Vehicle,
                    as: 'vehicle'
                }],
                })
            .then((semiTrailer) => {
                if(!semiTrailer){
                    return res.status(404).send({
                        message: 'semiTrailer Not Found',
                    });
                }
                return res.status(200).send(semiTrailer);
            })
            .catch((error) => res.send(400).send(error));
    },

    add(req,res) {
        return SemiTrailer
            .create({
                vehicleId: req.body.vehicleId,
                registrationNumber: req.body.registrationNumber,
                semiTrailerType: req.body.semiTrailerType
            })
            .then( (semiTrailer) => res.status(201).send(semiTrailer))
            .catch((error) => res.status(400).send(error));
    },

    update(req,res) {
        return SemiTrailer
            .findByPk(req.params.id, {
                include: [{
                    model: Vehicle,
                    as: 'vehicle'
                }],
            })
            .then( semiTrailer => {
                if(!semiTrailer) {
                    return res.status(400).send({
                        message: 'SemiTrailer Not Found',
                    });
                }
                return semiTrailer
                    .update({
                        registrationNumber: req.body.registrationNumber
                    })
                    .then( () => res.status(200).send(semiTrailer))
                    .catch( (error) => res.status(400).send(error))
            })
            .catch( (error) => res.status(400).send(error));
    },

    delete(req,res) {
        return SemiTrailer
            .findByPk(req.params.id, {
            })
            .then( semiTrailer => {
                if(!semiTrailer) {
                    return res.status(400).send({
                        message: 'SemiTrailer Not Found',
                    });
                }
                return semiTrailer
                    .destroy()
                    .then( () => res.status(204).send())
                    .catch( (error) => res.status(400).send(error));
            })
            .catch( (error) => res.status(400).send(error));
    },
};
