const { verify } = require('jsonwebtoken')
const Account = require('../models/Account')
const User = require('../models/User')

exports.jwtTokenValidator = async (req, res, next) => {
    try {
        //console.log(req.headers);
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: 'error',
                message: "Unauthorized, check your login"
            });
        }
        const accessTokenFromHeader = req.headers.authorization.split(" ")[1];
        //console.log(accessTokenFromHeader)
        if (!accessTokenFromHeader) {
            return res.status(401).json({
                status: 'error',
                message: "Unauthorized, check your login"
            });
        }

        const verified = await verify(accessTokenFromHeader, process.env.ACCESS_TOKEN)

        if (!verified) {
            return res.status(401).json({
                status: 'error',
                message: "Unauthorized, access token is not wokring"
            });
        }

        const user = await User.findById(verified.userId)
        const email = await Account.findOne({ email: verified.email })
        //console.log(user);
        req.user = user;
        req.email = email
        return next();
    }   
    catch (err) {
        return res.status(400).json({
            status: 'error',
            message: `Error in verify access token: ${err.message}`
        })
    }
}
