import jwt from "jsonwebtoken";

import privateKey from "../../config/config";

const { jwtPrivateKey } = privateKey;

const auth = (req, res, next) => {
  const { headers } = req;
  const token = headers.authorization;
  if (!token) throw new Error("Access denied. No token provided.");
  try {
    const worker = jwt.verify(token, jwtPrivateKey);
    req.worker = worker;
    next();
  } catch (ex) {
    return {
      msg: "Invalid token",
      error: ex.message,
    };
  }
};

export default auth;
