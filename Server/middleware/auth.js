const jwt = require('jsonwebtoken');
const config = require('../config/custom-environment-variables.json');
/*
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const opt = {
    _jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}
*/
module.exports = function (req, res, next) {


    let token = req.header('Authorization');
    console.log(token);
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {


        const decoded = jwt.verify(token, config.jwtPrivateKey);
        req.worker = decoded;
        console.log(req.worker);
        res.locals.user = req.worker;
        next();
    } catch (ex) {
        res.status(400).json({
            'msg': 'Invalid token',
            'error': ex,
            'token': token
        });
    }
}

