const express = require('express')
const router = express.Router()
const accontController = require('../controller/AccountController')
const validatorRegister = require('../middlewares/validatorRegister')
const validatorLogin = require('../middlewares/validatorLogin')
const jwtGuard = require('../middlewares/jwtTokenGuard')
const recruitmentController = require('../controller/RecruitmentController')

router.get('/login', (req, res) => {
    res.render('login', {layout: false})
})

router.get('/register', (req, res) => {
    res.render('register', {layout: false})
})

router.post('/register', validatorRegister, accontController.registerAccount)

router.post('/login', validatorLogin, accontController.loginAccountRecruiter)

router.get('/getRecruitments', jwtGuard.jwtTokenValidator, recruitmentController.getRecruitments)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

module.exports = router;
