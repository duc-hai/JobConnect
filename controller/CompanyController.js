const Company = require('../models/Company')

class CompanyController {
    async createProfile(req, res, next) {
        try {
            //console.log(req.body)
            //console.log(req.files)
            if (req.files.length != 0) {
                if (req.files.length == 1) {
                    req.body.logo = req.files[0].filename
                }
                else if (req.files.length == 2) {
                    req.body.logo = req.files[0].filename
                    req.body.coverImg = req.files[1].filename
                }
                else {
                    return res.status(400).json({
                        status: 'error',
                        message: 'you uploaded the wrong number of files'
                    })
                }
            }

            req.body.idUser = req.user.id
            let company = new Company(req.body)
            company = await company.save()
            return res.status(200).json({
                status: 'OK',
                message: 'Created company profile successfully'
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

module.exports = new CompanyController()