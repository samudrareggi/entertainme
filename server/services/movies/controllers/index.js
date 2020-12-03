const Movie = require('../models')

class Controller {
  static find(req, res) {
    Movie.find()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json('Internal Server Error')
    })
  }
  static findById(req, res) {
    Movie.findById(req.params.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json('Internal Server Error')
    })
  }
  static create(req, res) {
    Movie.create(req.body)
    .then(data => {
      res.status(200).json(data.ops[0])
    })
    .catch(err=> {
      console.log(err)
      res.status(500).json('Internal Server Error')
    })
  }
  static update(req, res) {
    Movie.update(req.params.id, req.body)
      .then(data => {
        if (!data.value) {
          return res.status(404).json('Not Found')
        }
        res.status(201).json(data.value)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json('Internal Server Error')
      })
  }
  static delete(req, res) {
    Movie.delete(req.params.id)
      .then(data => {
        if (!data.value) {
          return res.status(404).json('Not Found')
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