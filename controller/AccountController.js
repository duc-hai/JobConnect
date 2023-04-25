const Account = require('../models/Account')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')

class AccountController {
    async registerAccountRecruiter (req, res, next) {
        const {name, email, password, confirmPassword} = req.body
        let result = validationResult(req)
        if (result.errors.length !== 0) {
            result = result.mapped()
            let msg
            for (let i in result) {
                msg = result[i].msg
                break
            }
            return res.status(400).json({
                status: 'error',
                message: msg
            })
        }
        
        try {
            //Check whether email is exist or not
            let checkDuplicateEmail = await Account.findOne({email : email})
            if (checkDuplicateEmail) {
                return res.status(403).json({
                    status: 'Error',
                    message: 'Email đã tồn tại'
                })
            }

            let newUser = new User ({
                fullName: name,
                role: 2
            })

            newUser = await newUser.save()

            const hashPassword = await bcrypt.hashSync(password, 10)
            let newAccount = new Account({
                email: email,
                password: hashPassword,
                idUser: newUser._id
            })

            newAccount = await newAccount.save()
            return res.status(200).json({
                status: 'OK',
                message: 'Account is created successfully'
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

}
module.exports = new AccountController();