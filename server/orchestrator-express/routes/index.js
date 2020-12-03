const router = require('express').Router()
const movies = require('./Movies')
const series = require('./Series')

router.use('/movies', movies)
router.use('/tv', series)

module.exports = router