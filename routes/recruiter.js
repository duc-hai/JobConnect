const express = require('express')
const router = express.Router()
const accountController = require('../controller/AccountController')
const recruitmentController = require('../controller/RecruitmentController')
const companyController = require('../controller/CompanyController')
const validatorRegister = require('../middlewares/validatorRegister')
const validatorLogin = require('../middlewares/validatorLogin')
const jwtGuard = require('../middlewares/jwtTokenGuard')
const upload = require('../middlewares/multerRecruitment')
const uploadCompany = require('../middlewares/multerCompany')
const RecruitmentController = require('../controller/RecruitmentController')
const CompanyController = require('../controller/CompanyController')

router.get('/', jwtGuard.jwtTokenValidator, (req, res) => {
    res.render('recruiter/home', {layout: 'recruiter'})
})

router.get('/login', (req, res) => {
    res.render('recruiter/login', {layout: false})
})

router.get('/register', (req, res) => {
    res.render('recruiter/register', {layout: false})
})

router.get('/manage-recruitments', (req, res) => {
    res.render('recruiter/manage-recruitments', {layout: 'recruiter'})
})

router.post('/register', validatorRegister, accountController.registerAccountRecruiter)

router.post('/login', validatorLogin, accountController.loginAccountRecruiter)

router.get('/add-recruitment', (req, res) => {
    res.render('recruiter/add-recruitment', {layout: 'recruiter'})
})

router.get('/getAllRecruitments', jwtGuard.jwtTokenValidator, recruitmentController.getAllRecruitmentByCompany)

router.post('/add-recruitment', jwtGuard.jwtTokenValidator, upload.single('image'), recruitmentController.addRecruitment)

router.delete('/deleteRecruitment/:id', jwtGuard.jwtTokenValidator, recruitmentController.deleteRecruitmentByCompany)

router.get('/detailRecruitment/:id', jwtGuard.jwtTokenValidator, recruitmentController.detailRecruitmentByCompany)

router.put('/updateRecruitment/:id', jwtGuard.jwtTokenValidator, upload.single('image'), RecruitmentController.updateRecruitmentByCompany)

router.post('/update-profile-company', jwtGuard.jwtTokenValidator, uploadCompany.array('logo'), CompanyController.updateProfile)

router.get('/application-letters/:id', jwtGuard.jwtTokenValidator, RecruitmentController.applicationLetters)

router.get('/create-profile', jwtGuard.jwtTokenValidator, (req, res) => {
    res.render('recruiter/create-profile', {layout: 'recruiter'})
})

router.get('/profile-applicant/:id', jwtGuard.jwtTokenValidator, RecruitmentController.profileApplicant)

router.post('/create-profile-company', jwtGuard.jwtTokenValidator, uploadCompany.array('logo'), companyController.createProfile)

router.put('/apply-status', RecruitmentController.updateApplyStatus)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

module.exports = router;