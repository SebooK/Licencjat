const {check,body, validationResult} = require('express-validator');
const userValidationRules = () => {
    return [
        body('username')
            .notEmpty().withMessage('Field can not be empty')
            .isLength({ min: 5}).withMessage('Field should be at least 5 chars long')
            .isString(),
        check('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 char long')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
            .isString()
            .notEmpty().withMessage('Field can not be empty')
            .isLength({min: 8}).withMessage('Password should be at least 8 chars long'),
        body('email')
            .isEmail().withMessage('Should be email foo@example.com')
            .notEmpty().withMessage('Should be not empty')
    ]
};

const validate = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err=> extractedErrors.push({[err.param]: err.msg}));

    return res.status(422).json({
        errors:extractedErrors,
    })
};

module.exports = {
    userValidationRules,
    validate
};
