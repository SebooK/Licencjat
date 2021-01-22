import Joi from 'joi';
import Worker from '../models/workers.js';
import bcrypt from 'bcrypt';
import {generateAuthToken} from "../models/workers.js";

const login = async (req, res, next) => {
    const {error} = validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400).send(error)
    }
    let {id, role,password} = await Worker.findOne({
        where: {username: req.body.username}
    });
    if (!id) return res.status(400).send('Wrong username');

    const validPassword = await bcrypt.compare(req.body.password, password);
    if (!validPassword) return res.status(400).send('Invalid password');
    const token = generateAuthToken(id, role);
    res.json({"JSON-Web-Token": token});
    next();
}


const validate = (req) => {
    const schema = {
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
};

export {login, validate}
