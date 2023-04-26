const Recruitment = require('../models/Recruitment')
const User = require('../models/User')

class RecruitmentController {
    async addRecruitment(req, res, next) {
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

    async getAllRecruitmentByCompany(req, res, next) {
        try {
            if (!req.company) {
                return res.status(403).json({
                    status: 'error',
                    message: 'company not found, please check your login'
                })
            }

            const companyId = req.company.id

            let recruitments = await Recruitment.find({ idCompany: companyId })
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

    async deleteRecruitmentByCompany(req, res, next) {
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
            const checkExist = await Recruitment.find({ _id: req.params.id, idCompany: companyId })

            if (checkExist.length == 0) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not find recruitment with id: ${req.params.id}`
                })
            }

            const rel = await Recruitment.delete({ _id: req.params.id, idCompany: companyId })

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

    async detailRecruitmentByCompany(req, res, next) {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID recruitment not found, please check again'
                })
            }

            const companyId = req.company.id
            const recruitment = await Recruitment.findOne({ _id: req.params.id, idCompany: companyId })

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

    async updateRecruitmentByCompany(req, res, next) {
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
            const recruitment = await Recruitment.findOne({ _id: req.params.id, idCompany: companyId })

            if (!recruitment) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not find recruitment suitable for id ${req.params.id}`,
                })
            }

            const updateRecruitment = await Recruitment.findOneAndUpdate({ _id: req.params.id, idCompany: companyId }, req.body)

            const newRecruitment = await Recruitment.findOne({ _id: req.params.id, idCompany: companyId })

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

    async getRecruitments(req, res, next) {
        try {
            let perPage = req.query.perPage || 10 // Number of recruitments per page
            let page = req.query.page || 1 //Page which user wants to show 

            //
            let skip = (perPage * page) - perPage //In first page, skip 0 index
            let recruitments = await Recruitment.find({}, null, { limit: perPage, skip: skip }).lean()
            // for (let i = 0; i < recruitments.length; i++) {
            //     let companyName = await CompanyController.getCompanyName(recruitments[i].idCompany)
            //     recruitments[i]['companyName'] = companyName
            // }

            const count = await Recruitment.countDocuments({}) //Get number of pages
            const paginationRe = {
                currentPage: page,
                pageCount: Math.ceil(count / perPage),
                eachPage: perPage
            }
            //let companies = await CompanyController.getCompanies(12)
            res.status(200).json({
                status: 'OK',
                recruitments,
                paginationResult: paginationRe
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async searchRecruitment (req, res, next) {
        try {
            const { q, profession, salary, workingWay, position, province, district } = req.query //Get all field search from query
            //Check all fields is empty or not, if not empty, add to object to search
            let obj = {}
            if (q) {
                obj['$text'] = { $search: q }
            }
            if (profession) {
                obj.profession = profession
            }
            if (salary) {
                obj.salary = salary
            }
            if (workingWay) {
                obj.workingWay = workingWay
            }
            if (position) {
                obj.position = position
            }
            if (province) {
                obj['address.province'] = province
            }
            if (district) {
                obj['address.district'] = district
            }
            let recruitments = await Recruitment.find(obj).lean() //search
            //console.log(recruitments)
            let count = await Recruitment.find(obj).lean().countDocuments() //count number of documents which look for

            // for (let i = 0; i < recruitments.length; i++) {
            //     let companyName = await CompanyController.getCompanyName(recruitments[i].idCompany)
            //     recruitments[i]['companyName'] = companyName
            // }

            //console.log(recruitments)
            res.status(200).json({
                status: 'OK',
                recruitments,
                count
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async detailRecruitment (req, res, next) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID recruiment is required'
                })
            }

            const recruitment = await Recruitment.findById(id)
            
            if (!recruitment) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not get recruitment by ID ${id}`
                })
            }

            return res.status(200).json({
                status: 'OK',
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

    async saveRecruitment (req, res, next) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID recruiment is required'
                })
            }

            let checkExist = await Recruitment.findById(id)
            if (!checkExist) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not find recruitment with ID ${id}`
                })
            }

            const idUser = req.user._id
            // console.log(idUser)
            // let savedRecruitment = await User.findById(idUser).savedRecruitment
            // //let savedRecruitment = recruitment.savedRecruitment
            let savedRecruitment = await User.updateOne({_id: idUser}, { $set: { 'savedRecruitment' : [id]} }, {multi:true})
            //savedRecruitment['savedRecruitment'] = [id]
            //await savedRecruitment.save()
            // if (!savedRecruitment) {
            //     savedRecruitment = []
            // }
            
            // savedRecruitment.push(id)
            // console.log(savedRecruitment)
            // //recruitment['savedRecruitment'] = savedRecruitment
            // //console.log(recruitment)
            // let result = await User.findByIdAndUpdate(idUser, {savedRecruitment: savedRecruitment})
            //let result = await User.findByIdAndUpdate(idUser, savedRecruitment)
            return res.status(500).json({
                status: 'OK',
                message: `The recruitment with ID ${id} added bookmark successfully`,
                //result
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

module.exports = new RecruitmentController()