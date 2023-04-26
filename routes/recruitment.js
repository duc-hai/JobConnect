const express = require('express')
const router = express.Router()
const jwtGuard = require('../middlewares/jwtTokenGuard')
const recruitmentController = require('../controller/RecruitmentController')

router.get('/search', recruitmentController.searchRecruitment)
router.get('/detail/:id', recruitmentController.detailRecruitment)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

module.exports = router;
