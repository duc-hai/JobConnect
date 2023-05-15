const express = require('express')
const router = express.Router()
const accontController = require('../controller/AccountController')
const validatorRegister = require('../middlewares/validatorRegister')
const validatorLogin = require('../middlewares/validatorLogin')
const jwtGuard = require('../middlewares/jwtTokenGuardApplicant')
const recruitmentController = require('../controller/RecruitmentController')
const userController = require('../controller/UserController')
const upload = require('../middlewares/multerUser')

router.get('/login', (req, res) => {
    res.render('login', {layout: false})
})

router.get('/register', (req, res) => {
    res.render('register', {layout: false})
})

router.post('/register', validatorRegister, accontController.registerAccount)

router.post('/login', validatorLogin, accontController.loginAccountRecruiter)

router.get('/getRecruitments', jwtGuard.jwtTokenValidator, recruitmentController.getRecruitments)

router.post('/update-profile', jwtGuard.jwtTokenValidator, upload.single('avatar'), userController.updateProfile)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

module.exports = router;
