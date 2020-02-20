const {User, validate }= require('../models/user');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  const users = await User.find().sort('userName');
  res.send(users);
});

router.post('/', async (req,res) => {
  const {error} = validate(req.body); //result.error
  if(error) return res.status(400).send(error.details[0].message);

    let user = new User({
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: req.body.type
    });

  user = await user.save();
  res.send(user);

});

router.put('/:id', async (req,res) => {
  const { error } = validate(req.body); // result.error
  if(error) { return   res.status(400).send(error.details[0].message); }

   const user = await User.findByIdAndUpdate(req.params.id,{
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    type: req.body.type }, {new: true})

  if(!user) { return res.status(404).send('The course with the given id was not found.'); }

  res.send(user);
});

router.delete('/:id', async (req,res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if(!user) {return res.status(404).send('User with the given id was not found')};

  res.send(user);
});


router.get('/:id', async (req,res) => {
  const user = await User.findById(req.params.id);

  if(!user) {return res.status(404).send('User with the given id was not found')};

  res.send(user);
})

module.exports = router;
