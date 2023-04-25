const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home')
})
router.use('/', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})
module.exports = router;
