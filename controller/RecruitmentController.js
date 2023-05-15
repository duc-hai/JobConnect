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
                message: `Recruitment created successfully with id ${recruitment.id}`
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
            //Soft delete, set "deleted" is true in database without permanently deleted
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

            if (!updateRecruitment) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not find suitable recruitment`,
                })
            }
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

    async searchRecruitment(req, res, next) {
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

    async detailRecruitment(req, res, next) {
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
                    message: `Can not find recruitment with ID ${id}`
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

    async saveRecruitment(req, res, next) {
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
            let savedList = await User.findById(idUser)

            //Check whether user has any job or not, if it empty, initialize a new array
            if (savedList) {
                savedList = savedList.savedJob
            }
            else {
                savedList = []
            }
            //If recruitment is exist in "Saved job", remove it, else push to list
            let index = savedList.indexOf(id)
            let action = 'removed in saved job list'
            if (index > -1) {
                savedList.splice(index, 1)
            }
            else {
                action = 'added bookmark'
                savedList.push(id)
            }
            let savedRecruitment = await User.findOneAndUpdate({ _id: idUser }, {savedJob : savedList})
            
            return res.status(500).json({
                status: 'OK',
                message: `The recruitment with ID ${id} ${action} successfully`,
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async applyRecruitment(req, res, next) {
        try {
            //ID recruitment
            const id = req.params.id

            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID recruiment is required'
                })
            }

            //Check whether is exist or not
            let checkExist = await Recruitment.findById(id)
            if (!checkExist) {
                return res.status(400).json({
                    status: 'error',
                    message: `Can not find recruitment with ID ${id}`
                })
            }

            const userId = req.user._id

            let appliedJob = (await User.findById(userId).lean()).appliedJob
            if (!appliedJob) {
                // return res.status(400).json({
                //     status: 'error',
                //     message: 'Can not find applied job in database'
                // })
                appliedJob = []
            }

            //Check job is exist in applied jobs
            if (appliedJob.length > 0) {
                let isExist = false
                for (let i = 0; i < appliedJob.length; i++) {
                    if (appliedJob[i].jobId == id) {
                        isExist = true
                        break
                    }
                }

                if (isExist) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'This recruitment is already applied, please unsubmit and try again'
                    })
                }
            }

            const recomdLetter = req.body.recomdLetter || ''

            const newApplyJob = {
                jobId: id,
                recomdLetter
            }

            appliedJob.push(newApplyJob)
            //console.log(userId)
            //console.log(appliedJob)

            const userInfo = await User.findOneAndUpdate(
                { _id: userId },
                { appliedJob }
            )
            
            //Add id user applied to collection "Recruitment"
            const userListApplied = (await Recruitment.findById(id)).appliedUser || []

            //console.log(userListApplied)
            userListApplied.push(userId)

            const recruitmentInfor = await Recruitment.findByIdAndUpdate(id, { appliedUser: userListApplied })

            //console.log(companyInfo)

            return res.status(200).json({
                status: 'OK',
                message: `Apply recruitment with id ${id} successfully`,
                userInfo,
                recruitmentInfor
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async viewSavedRecruitment (req, res, next) {
        try {
            const userId = req.user._id
            const listSavedRecruitments = (await User.findById(userId)).savedJob
            if (!listSavedRecruitments) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Something wrong happened, your saved job is not exist'
                })
            }

            return res.status(200).json({
                status: 'OK',
                message: `Get saved job successfully`,
                listSavedRecruitments
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async viewAppliedRecruitment (req, res, next) {
        try {
            const userId = req.user._id
            const listSavedRecruitments = (await User.findById(userId)).appliedJob
            if (!listSavedRecruitments) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Something wrong happened, your applied job is not exist'
                })
            }

            return res.status(200).json({
                status: 'OK',
                message: `Get applied job successfully`,
                listSavedRecruitments
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async applicationLetters (req, res, next) {
        try {
            const idCompany = req.company.id
            const idRecruitment = req.params.id 
            const isCompanyValid = await Recruitment.findOne({idCompany, _id: idRecruitment})

            if (!isCompanyValid) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Recruitment is not found'
                })
            }

            const applicationLettersList = isCompanyValid.appliedUser

            return res.status(200).json({
                status: 'OK',
                message: 'Get applied user successfully',
                applicationLettersList
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async profileApplicant (req, res, next) {
        try {
            const idApplicant = req.params.id
            const profileApplicant = await User.findOne({_id: idApplicant, role: 1})
            return res.status(200).json({
                status: 'OK',
                message: 'Get profile successfully applied',
                profileApplicant
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async updateApplyStatus (req, res, next) {
        try {
            const {idUser, idRecruitment, status} = req.body

            //Validator id
            if (!idUser || !idRecruitment) {
                return res.status(400).json({
                    status: 'error',
                    message: 'ID applicant and ID recruitment is required'
                })
            }

            //Validator status
            if (!status) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Status of application letter is required'
                })
            }
            
            //Get applied job list in collection "user"
            let appliedJobList = (await User.findById(idUser)).appliedJob
            if (!appliedJobList) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User or applied job list are not exist'
                })
            }

            //Get applied job suitable for id parameter
            for (let i = 0; i < appliedJobList.length; i++) {
                if (appliedJobList[i].jobId == idRecruitment) {
                    appliedJobList[i].response = {
                        code: req.body.code || 0,
                        message: status
                    }
                    break
                }
            }

            //Update
            await User.findByIdAndUpdate(idUser, {appliedJob: appliedJobList})

            return res.status(200).json({
                status: 'OK',
                message: 'Updated applied job successfully'
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