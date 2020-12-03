const router = require('express').Router()
const Controller = require('../controllers/SeriesController')

router.post('/', Controller.create)
router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router