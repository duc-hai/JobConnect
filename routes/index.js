const express = require('express')
const router = express.Router()
const recruiterRouter = require('./recruiter')
const homeRouter = require('./home')
const recruitmentRouter = require('./recruitment')

router.get('/', (req, res) => {
    res.render('home')
})
router.get('/login', (req, res) => {
    res.render('login', {layout: false})
})

router.use('/recruiter', recruiterRouter)
router.use('/recruitment', recruitmentRouter)
router.use('/', homeRouter)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})
module.exports = router;
