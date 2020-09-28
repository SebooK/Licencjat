const jwt = require('jsonwebtoken');
const config = require('../config/custom-environment-variables.json');

module.exports = function (req, res, next) {

    let token = req.header('Authorization');
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
};

