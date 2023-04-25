const {check} = require ('express-validator')

const validator = [
    check('name').exists().withMessage('Please enter your full name')
        .notEmpty().withMessage('Your name is required')
        .isLength({ min: 2 }).withMessage('Name is too short'),

    check('email').exists().withMessage('Please enter your email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid'),

    check('password').exists().withMessage('Please enter your password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    check('confirmPassword').exists().withMessage('Please enter your confirm password')
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm password is incorrect');
            }
            return true
        })
]

module.exports = validator