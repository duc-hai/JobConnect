const express = require('express')
const router = express.Router()
const accountController = require('../controller/AccountController')
const validatorRegister = require('../middlewares/validatorRegister')

router.get('/', (req, res) => {
    res.render('home')
})
router.get('/login', (req, res) => {
    res.render('login', {layout: false})
})

router.get('/recruiter/login', (req, res) => {
    res.render('recruiter/login', {layout: false})
})

router.get('/recruiter/register', (req, res) => {
    res.render('recruiter/register', {layout: false})
})


router.post('/recruiter/register',  validatorRegister, accountController.registerAccountRecruiter)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})
module.exports = router;
