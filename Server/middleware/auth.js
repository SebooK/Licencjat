const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function (req,res,next) {
    let token = req.header('Authorization');
    console.log(token);
    if(!token) return res.status(401).send('Access denied. No token provided.');
    try{
        if(token.startsWith('Bearer ')) {
            token = token.slice(7,token.length);
        }

    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.worker = decoded;
    res.locals.user = req.worker;

    next();
    }
    catch(ex){
        res.status(400).send('Invalid token');
    }
}

