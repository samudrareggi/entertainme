const router = require('express').Router()
const movies = require('./Movies')
const series = require('./Series')
const entertainme = require('./Entertainme')

router.use('/entertainme', entertainme)
router.use('/movies', movies)
router.use('/tv', series)

module.exports = router