const router = require('express').Router()
const Controller = require('../controllers/EntertainmeController')

router.get('/', Controller.find)

module.exports = router