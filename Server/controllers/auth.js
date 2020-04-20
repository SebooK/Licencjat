const Joi = require('joi');
const Worker = require('../models').Worker;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = {
   async login (req,res) {
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
       let user = await Worker.findOne({
           where: {username: req.body.username}
       });

       if(!user) return res.status(400).send('Wrong username');

       const validPassword = await bcrypt.compare(req.body.password, user.password);
       if(!validPassword) return res.status(400).send('Invalid password');
       const token = user.generateAuthToken();
       res.json({"JSON-Web-Token":token});
    }
}
function validate(req) {
    const schema = {
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req,schema);
};