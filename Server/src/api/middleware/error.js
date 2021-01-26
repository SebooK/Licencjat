import logger from "../../loaders/logger";

const error = (err, req, res, next) => {
  logger.error(err.message);
  res.status(422).json({ error: err.message });
  next();
};
export default error;
