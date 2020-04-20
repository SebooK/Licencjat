
module.exports = function (req,res,next) {
    console.log(req.worker.role);
    if(req.worker.role == 0) return res.status(403).send('Access denied.');
    next();
};