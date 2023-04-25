const express = require('express')
const router = express.Router()
const accountController = require('../controller/AccountController')
const validatorRegister = require('../middlewares/validatorRegister')
const validatorLogin = require('../middlewares/validatorLogin')
const jwtGuard = require('../middlewares/jwtTokenGuard')


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

module.exports = router;