const {check} = require ('express-validator')

const validator = [
    check('email').exists().withMessage('Please enter your email address')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid'),

    check('password').exists().withMessage('Please enter your password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
]

module.exports = validator