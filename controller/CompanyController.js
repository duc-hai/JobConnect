const Company = require('../models/Company')

class CompanyController {
    async createProfile(req, res, next) {
        try {
            const isExistProfile = await Company.findOne({ idUser: req.user.id })
            if (isExistProfile) {
                return res.status(400).json({
                    status: 'error',
                    message: 'You created your company profile, please update this'
                })
            }
            //console.log(isExistProfile)
            //console.log(req.body)
            //console.log(req.files)
            if (req.files && req.files.length != 0) {
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

    async updateProfile(req, res, next) {
        try {
            if (req.files && req.files.length != 0) {
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

            const rel = await Company.findOneAndUpdate({ idUser: req.user.id }, req.body, { new: true })
            return res.status(200).json({
                status: 'OK',
                message: 'Company profile was updated successfully',
                newProfile: rel
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async search(req, res, next) {
        try {
            let obj = {}
            if (req.query.q) {
                obj['$text'] = { $search: req.query.q }
            }
    
            let companiesList = await Company.find(obj).lean()
            return res.status(200).json({
                status: 'OK',
                companiesList
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async getCompanies (req, res, next) {
        try {
            return res.status(200).json({
                status: 'OK',
                companyList: await Company.find().limit(8)
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async detailCompany (req, res, next) {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Company ID is required'
                })
            }
            const company = await Company.findById(req.params.id) 
            if (!company) {
                return res.status(400).json({
                    status: 'error',
                    message: `The company with id ${req.params.id} is not exist`
                })
            }
            return res.status(200).json({
                status: 'OK',
                company
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            })
        }
    }

    //Get company name by id
    async getCompanyName (id) {
        let companyName = await Company.findById(id)
        .then ((company) => {
            return company.name
        })
        .catch((err) => {
            console.log(err)
        })  
        return companyName
    }

    async getCompanies (count) {
        try {
            let companies = await Company.find({}, null, {limit: count}).lean()
            return companies
        }
        catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = new CompanyController()