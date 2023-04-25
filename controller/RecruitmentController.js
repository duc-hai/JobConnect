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

    async getAllRecruitmentByCompany (req, res, next) {
        try {
            if (!req.company) {
                return res.status(403).json({
                    status: 'error',
                    message: 'company not found, please check your login'
                })
            }
    
            const companyId = req.company.id
            
            let recruitments = await Recruitment.find({idCompany: companyId})
            return res.status(200).json({
                status: 'OK',
                recruitments
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async deleteRecruitmentByCompany (req, res, next) {
        try {

            if (!req.company) {
                return res.status(403).json({
                    status: 'error',
                    message: 'company not found, please check your login'
                })
            }

            if (!req.params.id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID recruitment not found, please check again'
                })
            }
    
            const companyId = req.company.id

            //Check recruitment is exist in DB
            const checkExist = await Recruitment.find({_id: req.params.id, idCompany: companyId})
            
            if (checkExist.length == 0) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not find recruitment with id: ${req.params.id}`
                })
            }

            const rel = await Recruitment.delete({_id: req.params.id, idCompany: companyId})

            return res.status(200).json({
                status: 'OK',
                message: 'Recruitment deleted successfully',
                detail: rel
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async detailRecruitmentByCompany (req, res, next) {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID recruitment not found, please check again'
                })
            }

            const companyId = req.company.id
            const recruitment = await Recruitment.findOne({_id: req.params.id, idCompany: companyId})

            if (!recruitment) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not find recruitment suitable for id ${req.params.id}`,
                })
            }   

            return res.status(200).json({
                status: 'OK',
                message: 'Get detail recruitment successfully',
                recruitment
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async updateRecruitmentByCompany (req, res, next) {
        try {
            //console.log(req.body)
            if (!req.params.id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID recruitment not found, please check again'
                })
            }

            if (req.file) {
                //console.log(req.file)
                req.body.image = req.file.filename
            }

            const companyId = req.company.id
            const recruitment = await Recruitment.findOne({_id: req.params.id, idCompany: companyId})

            if (!recruitment) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not find recruitment suitable for id ${req.params.id}`,
                })
            }   

            const updateRecruitment = await Recruitment.findOneAndUpdate({_id: req.params.id, idCompany: companyId}, req.body)

            const newRecruitment = await Recruitment.findOne({_id: req.params.id, idCompany: companyId})

            return res.status(200).json({
                status: 'OK',
                message: `Update recruitment with id ${req.params.id} successfully`,
                oldRecruitment: updateRecruitment,
                newRecruitment
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