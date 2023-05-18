const Report = require('../models/Report')

class ReportController {
    async createReport (req, res, next) {
        try {
            const {idReport, description} = req.body
            const filesUpload = req.files
            let images = []
            if (filesUpload) {
                for (let i = 0; i < filesUpload.length; i++) {
                    images.push(filesUpload[i].filename)
                }
            }
            let userReport
            if (res.locals.typeReport == 1) {
                userReport = req.user._id 
            }
            if (!userReport) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID user submit is not valid, please check your login credentials'
                })
            }
            const report = new Report({
                userReport,
                typeReport: res.locals.typeReport,
                idReport,
                description,
                images
            })

            const rel = await report.save()
            return res.status(200).json({
                status: 'OK',
                message: `Report was successfully created with id ${rel.id}` 
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

module.exports = new ReportController ()