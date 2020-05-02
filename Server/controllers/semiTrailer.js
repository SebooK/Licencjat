const SemiTrailer = require('../models').SemiTrailer;
const Vehicle = require('../models').Vehicle;

const options = {
    offset: 0,
    limit: 15
};

module.exports = {
    list(req, res) {
        return SemiTrailer
            .findAndCountAll()
            .then(data => {
                let page = req.param.page;
                let pages = Math.ceil(data.count / options.limit);
                options.offset = options.limit * (page - 1);
                SemiTrailer
                    .findAll({

                        include: [{
                            model: Vehicle,
                            as: 'vehicle'
                        }]
                    })
                    .then((semitrailers) => res.status(200).send({'result':semitrailers, 'count':data.count, 'pages': pages}))
                    .catch((error) => {
                        res.status(400).send(error);
                        console.log(error);
                    })
            })
            .catch(error => res.status(500).send(error));

    },
    getById(req, res) {
        return SemiTrailer
            .findByPk(req.params.id, {
                include: [{
                    model: Vehicle,
                    as:'vehicle'
                }],
            })
            .then((semiTrailer) => {
                if (!semiTrailer) {
                    return res.status(404).send({
                        message: 'semiTrailer Not Found',
                    });
                }
                return res.status(200).send(semiTrailer);
            })
            .catch((error) => res.send(400).send(error));
    },

    add(req, res) {
        return SemiTrailer
            .create({
                registrationNumber: req.body.registrationNumber,
                semiTrailerType: req.body.semiTrailerType
            })
            .then((semiTrailer) => res.status(201).send(semiTrailer))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return SemiTrailer
            .findByPk(req.params.id, {
                include: [{
                    model: Vehicle,
                    as: 'vehicle'
                }],
            })
            .then(semiTrailer => {
                if (!semiTrailer) {
                    return res.status(400).send({
                        message: 'SemiTrailer Not Found',
                    });
                }
                return semiTrailer
                    .update({
                        registrationNumber: req.body.registrationNumber
                    })
                    .then(() => res.status(200).send(semiTrailer))
                    .catch((error) => res.status(400).send(error))
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return SemiTrailer
            .findByPk(req.params.id, {})
            .then(semiTrailer => {
                if (!semiTrailer) {
                    return res.status(400).send({
                        message: 'SemiTrailer Not Found',
                    });
                }
                return semiTrailer
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
