const express = require('express')
const router = express.Router()
const companyController = require('../controller/CompanyController')

router.get('/search', companyController.search)
router.get('/get-list', companyController.getCompanies)
router.get('/:id', companyController.detailCompany)

router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

module.exports = router;

