const RecruitmentController = require('../controller/RecruitmentController')
const CompanyController = require('../controller/CompanyController')
const Recruitment = require('../models/Recruitment')

class HomeController {
    async renderHome (req, res, next) {
        let perPage = 12 // Number of recruitments per page
        let page = req.query.page || 1 //Page which user wants to show 
        
        let recruitments = await RecruitmentController.getRecruitmentsHome(perPage, page)
        const count = await Recruitment.countDocuments({}) //Get number of pages
        const paginationRe = {
            currentPage: page,
            pageCount: Math.ceil(count / perPage)
        }

        let companies = await CompanyController.getCompanies(12)
        
        res.render('home', {recruitments, paginationRe, companies})
    }
}

module.exports = new HomeController ()