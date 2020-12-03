const router = require('express').Router()
const Controller = require('../controllers')

router.post('/movies', Controller.create)
router.get('/movies', Controller.find)
router.get('/movies/:id', Controller.findById)
router.put('/movies/:id', Controller.update)
router.delete('/movies/:id', Controller.delete)

module.exports = router