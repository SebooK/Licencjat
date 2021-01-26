const role = (req, res, next) => {
  if (req.worker.role === 0)
    return res.status(403).json({ message: "Access denied." });
  next();
};

export default role;
