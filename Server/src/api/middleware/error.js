import logger from '../logger/logger.js';

export const error = (err, req, res, next) => {
    logger.error(err.message);
    res.status(422).send({error: err.message});
    next();
}
