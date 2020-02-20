const {OrderDetails,validate } = require('../models/orderDetails');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const orderDetails = await OrderDetails.find().sort('address');
    res.send(orderDetails);
});

router.post('/', async (req,res) => {
    const {error} = validate(req.body); //result.error
    if(error) return res.status(400).send(error.details[0].message);

    let order = new OrderDetails({
        address: req.body.address,
        companyName: req.body.companyName,
        description: req.body.description,
        deliverDate: req.body.deliverDate,

    });

    order = await order.save();
    res.send(order);
});

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body); // result.error
    if(error) { return   res.status(400).send(error.details[0].message); }

    const order = await OrderDetails.findByIdAndUpdate(req.params.id,{
        address: req.body.address,
        companyName: req.body.companyName,
        description: req.body.description,
        deliverDate: req.body.deliverDate,
    }, {new: true})

    if(!order) { return res.status(404).send('The order with the given id was not found.'); }

    res.send(order);
});

router.delete('/:id', async (req,res) => {
    const order = await OrderDetails.findByIdAndRemove(req.params.id);
    if(!order) {return res.status(404).send('order with the given id was not found')};

    res.send(order);
});

router.get('/:id', async (req,res) => {
    const order = await OrderDetails.findById(req.params.id);

    if(!order) {return res.status(404).send('order with the given id was not found')};

    res.send(order);
})

module.exports = router;
