const User = require('../models/User')

class UserController {
    async updateProfile (req, res, next) {
        try {
            console.log(req.body)

            if (req.file) {
                req.body.avatar = req.file.filename
            }

            const idUser = req.user.id

            const userInfor = await User.findByIdAndUpdate(idUser, req.body, { new: true })
            return res.status(200).json({
                status: 'OK',
                message: 'Updated user successfully',
                userInfor
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

module.exports = new UserController()