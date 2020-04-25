
module.exports = function (req,res,next) {

   if(res.locals.user.role == 0) return res.status(403).send('Access denied.');
    next();
};