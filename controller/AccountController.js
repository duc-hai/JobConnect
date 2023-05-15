const Account = require('../models/Account')
const { validationResult } = require('express-validator') //Form validation
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

class AccountController {
    async registerAccountRecruiter(req, res, next) {
        const { name, email, password, confirmPassword } = req.body

        //Check validation inputs
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
            let checkDuplicateEmail = await Account.findOne({ email: email })
            if (checkDuplicateEmail) {
                return res.status(403).json({
                    status: 'Error',
                    message: 'Email đã tồn tại'
                })
            }

            //Create a new user in collection "user"
            let newUser = new User({
                fullName: name,
                role: 2
            })

            newUser = await newUser.save()

            //encrypt password
            const hashPassword = await bcrypt.hashSync(password, 10)
            let newAccount = new Account({
                email: email,
                password: hashPassword,
                idUser: newUser._id
            })
            
            //Create a new account in collection "account"
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

    async loginAccountRecruiter(req, res, next) {
        const { email, password } = req.body
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

        let account = await Account.findOne({ email: email }).lean()

        //Account is not exist
        if (!account) {
            return res.status(400).json({ status: 'error', message: 'Email or password is incorrect' })
        }

        //Password is not exist
        const matched = await bcrypt.compareSync(password, account.password);
        if (!matched) {
            return res.status(400).json({ status: 'error', message: 'Email or password is incorrect' })
        }

        //Account is correct: create access token and refresh token
        let accessToken = jwt.sign({ userId: account.idUser, email: account.email }, process.env.ACCESS_TOKEN, { algorithm: 'HS256', expiresIn: '10h' })
        let refreshToken = jwt.sign({ userId: account.idUser, email: account.email }, process.env.REFRESH_TOKEN)

        res.cookie('accessToken', accessToken, {
            //Config cookie
            httpOnly: true,
        })
        
        return res.status(200).json({
            status: 'OK',
            access_token: accessToken,
            refresh_token: refreshToken,
        })
    }


    async registerAccount(req, res, next) {
        const { name, email, password, confirmPassword } = req.body
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
            let checkDuplicateEmail = await Account.findOne({ email: email })
            if (checkDuplicateEmail) {
                return res.status(403).json({
                    status: 'Error',
                    message: 'Email đã tồn tại'
                })
            }

            let newUser = new User({
                fullName: name,
                role: 1
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
module.exports = new AccountController()