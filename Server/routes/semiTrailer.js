const {SemiTrailer, validate }= require('../models/semiTrailer');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const semiTrailer = await SemiTrailer.find().sort('type');
    res.send(semiTrailer);
});

router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let semiTrailer = new SemiTrailer ({
        registrationNumber: req.body.registrationNumber,
        type: req.body.type
    });

    semiTrailer = await semiTrailer.save();
    res.send(semiTrailer);
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
