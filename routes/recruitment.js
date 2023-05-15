const express = require('express')
const router = express.Router()
const jwtGuard = require('../middlewares/jwtTokenGuardApplicant')
const recruitmentController = require('../controller/RecruitmentController')

router.get('/search', recruitmentController.searchRecruitment)
router.get('/detail/:id', recruitmentController.detailRecruitment)
router.get('/save/:id', jwtGuard.jwtTokenValidator, recruitmentController.saveRecruitment)
router.get('/save', jwtGuard.jwtTokenValidator, recruitmentController.viewSavedRecruitment)
router.post('/apply/:id', jwtGuard.jwtTokenValidator, recruitmentController.applyRecruitment)
router.get('/apply', jwtGuard.jwtTokenValidator, recruitmentController.viewAppliedRecruitment)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

module.exports = router;
