const {check} = require ('express-validator')

const validator = [
    check('name').exists().withMessage('Vui lòng nhập tên người dùng')
        .notEmpty().withMessage('Tên người dùng không được để trống')
        .isLength({ min: 2 }).withMessage('Tên người dùng quá ngắn'),

    check('email').exists().withMessage('Vui lòng nhập email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),

    check('password').exists().withMessage('Vui lòng nhập mật khẩu')
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 kí tự'),

    check('confirmPassword').exists().withMessage('Vui lòng nhập mật khẩu xác nhận')
        .notEmpty().withMessage('Mật khẩu xác nhận không được để trống')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Mật khẩu xác nhận không đúng');
            }
            return true
        })
]

module.exports = validator