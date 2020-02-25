const {Vehicles, validate } = require('../models/vehicles');
const { Vehicle } = require('../models/vehicle');
const { SemiTrailer } =require('../models/semiTrailer');
const { User } = require ()
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const vehicles = await Vehicles.find().sort('type');
    res.send(vehicles);
});

router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const vehicle = await Vehicle.findById(req.body.vehicleId);
    if(!vehicle) return res.status(400).send('Invalid vehicle');

    const semiTrailer = await SemiTrailer.findById(req.body.semiTrailerId);
    if(!semiTrailer) return res.status(400).send('Invalid semiTrailer');

    let vehicles = new Vehicles ({
        vehicleType: req.body.vehicleType,
        vehicle: {
            _id:vehicle._id,
            registrationNumber:vehicle.registrationNumber
        },

        semiTrailer: {
            _id:semiTrailer._id,
            type:semiTrailer.type,
            registrationNumber: semiTrailer.registrationNumber
        },
        carrier

    });

    vehicles = await vehicles.save();
    res.send(vehicles);
});

router.put('/:id', async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const semiTrailer = await SemiTrailer.findByIdAndUpdate(req.params.id, {
        registrationNumber: req.body.registrationNumber,
        type: req.body.type,

    }, {new: true })

    if(!semiTrailer) { return res.status(400).send(`Nie znaleziono naczepy z takim id`);}

    res.send(semiTrailer);
});

router.delete('/:id', async (req,res) => {
    const semiTrailer = await SemiTrailer.findByIdAndRemove(req.params.id);

    if(!semiTrailer) { return res.status(400).send(`Nie znaleziono naczepy z takim id`);}

    res.send(semiTrailer);
});

router.get('/:id', async (req,res) => {
    const semiTrailer = await SemiTrailer.findById(req.params.id);
    if(!semiTrailer) { return res.status(400).send(`Nie znaleziono naczepy z takim id`);}

    res.send(semiTrailer);

});

module.exports = router;
