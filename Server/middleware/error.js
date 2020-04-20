const logger  = require('../logger/logger.js');
module.exports = function(err, req,res, next) {
    logger.error(err.message);
    res.status(422).send({error:err.message});
}