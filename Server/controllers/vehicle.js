import SemiTrailer from '../models/semitrailer.js';
import Vehicle from '../models/vehicle.js';
import Worker from '../models/workers.js';
const options = {
    offset: 0,
    limit: 15
};

export const list = (req, res) => {
        return Vehicle
            .findAndCountAll()
            .then(data => {
                let page = req.params.page;
                let pages = Math.ceil(data.count / options.limit);
                options.offset = options.limit * (page - 1);
                Vehicle
                    .findAll({
                        include: [{
                            model: Worker,
                            as: 'worker',
                        }, {
                            model: SemiTrailer,
                            as:'semiTrailer'
                        }],
                        limit: options.limit,
                        offset: options.offset,
                        order: [
                            ['createdAt', 'DESC'],
                        ],
                    })
                    .then((vehicles) => res.status(200).send({'result': vehicles, 'count': data.count, 'pages': pages}))
                    .catch((error) => {
                        res.status(400).send(error);
                        console.log(error);
                    })
            })
            .catch(error => res.status(500).send(error));
    }

export const getById = (req, res) => {
        return Vehicle
            .findByPk(req.params.id, {
                include: [{
                    model: SemiTrailer,
                    as: 'semiTrailer'
                }, {
                    model: Worker,
                    as: 'worker',
                }
                ],
            })
            .then((vehicle) => {
                if (!vehicle) {
                    return res.status(404).send({
                        message: 'Vehicle Not Found',
                    });
                }
                return res.status(200).json(vehicle);
            })
            .catch((error) => res.status(400).send(error));
    }

export const add = (req, res) => {

        return Vehicle
            .create({
                registrationNumber: req.body.registrationNumber,
                vehicleNumber: req.body.vehicleNumber,
                vehicleType: req.body.vehicleType,
                localization: req.body.localization,
                workerId: req.body.workerId,
                semiTrailerId: req.body.semiTrailerId
            })
            .then((vehicle) => res.status(201).send(vehicle))
            .catch((error) => res.status(400).send(error));

    }

export const update = (req, res) => {
        return Vehicle
            .findByPk(req.params.id)
            .then(vehicle => {
                if (!vehicle) {
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
                        semiTrailerId: req.body.semiTrailerId
                    })
                    .then(() => res.status(200).send(vehicle))
                    .catch((error) => {
                        res.status(400).send(error);
                        console.log(error)
                    })
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error)
            });
    }

export const vehicleDelete = (req, res) => {
        return Vehicle
            .findByPk(req.params.id)
            .then(vehicle => {
                if (!vehicle) {
                    return res.status(400).send({
                        message: 'Vehicle Not Found'
                    })
                }
                return vehicle
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error))
            })
            .catch((error) => res.status(400).send(error));
    }

