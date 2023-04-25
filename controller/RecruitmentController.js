const Recruitment = require('../models/Recruitment')

class RecruitmentController {
    async addRecruitment (req, res, next) {
        try {
            if (req.file) {
                req.body.image = req.file.filename
            }
            if (req.company) {
                req.body.idCompany = req.company.id
            }
            let recruitment = new Recruitment(req.body)
            recruitment = await recruitment.save()
            return res.status(200).json({
                status: 'OK',
                message: 'Recruitment created successfully'
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

module.exports = new RecruitmentController ()