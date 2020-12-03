const Series = require('../models')

class Controller {
  static find(req, res) {
    Series.find()
      .then(data => {
        if (!data.length) {
          res.status(403).json('Not Found')
        }
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json('Internal Server Error')
      })
  }
  static findById(req, res) {
    Series.findById(req.params.id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json('Internal Server Error')
      })
  }
  static create(req, res) {
    Series.create(req.body)
      .then(data => {
        res.status(201).json(data.ops[0])
      })
      .catch(err => {
        console.log(err)
        res.status(500).json('Internal Server Error')
      })
  }
  static update(req, res) {
    Series.update(req.params.id, req.body)
      .then(data => {
        if (!data.value) {
          res.status(403).json('Not Found')
        }
        res.status(201).json(data.value)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json('Internal Server Error')
      })
  }
  static delete(req, res) {
    Series.delete(req.params.id)
      .then(data => {
        if (!data.value) {
          res.status(403).json('Not Found')
        }
        res.status(200).json(data.value)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json('Internal Server Error')
      })
  }
}

module.exports = Controller