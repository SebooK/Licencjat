const {Vehicle, validate }= require('../models/vehicle');

const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const vehicles = await Vehicle.find().sort('registrationNumber');
    res.send(vehicles);
});

router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let vehicle = new Vehicle ({
        registrationNumber: req.body.registrationNumber
    });

    vehicle = await vehicle.save();
    res.send(vehicle);
});

router.put('/:id', async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, {
        registrationNumber: req.body.registrationNumber
    }, {new: true })

    if(!vehicle) { return res.status(400).send(`Nie znaleziono pojazdu z takim id`);}

    res.send(vehicle);
});

router.delete('/:id', async (req,res) => {
    const vehicle = await Vehicle.findByIdAndRemove(req.params.id);

    if(!vehicle) { return res.status(400).send(`Nie znaleziono pojazdu z takim id`);}

    res.send(vehicle);
});

router.get('/:id', async (req,res) => {
    const vehicle = await Vehicle.findById(req.params.id);
    if(!vehicle) { return res.status(400).send(`Nie znaleziono pojazdu z takim id`);}

    res.send(vehicle);

});

module.exports = router;
