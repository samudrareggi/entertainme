const router = require('express').Router()
const Controller = require('../controllers')

router.post('/tv', Controller.create)
router.get('/tv', Controller.find)
router.get('/tv/:id', Controller.findById)
router.put('/tv/:id', Controller.update)
router.delete('/tv/:id', Controller.delete)

module.exports = router