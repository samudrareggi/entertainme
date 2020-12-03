const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const baseUrl = 'http://localhost:5001/movies/'

class MovieController {
  static find(req, res) {
    redis.get('movies')
      .then(data => {
        if (data) {
          console.log('disanaa')
          return res.status(200).json(JSON.parse(data))
        }
        return axios({
          url: baseUrl,
          method: 'GET'
        })
      })
      .then(({data}) => {
        res.status(200).json(data)
        redis.set('movies', JSON.stringify(data))
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
      })
  }
  static findById(req, res) {
    redis.get('movies')
      .then(data => {
        console.log(data)
        if (data) {
          console.log('disanaa')
          data = JSON.parse(data)
          const filter = data.filter(datum => datum._id === req.params.id)
          if (filter.length) {
            return res.status(200).json(filter[0])
          }
        }
        return axios({
          url: baseUrl + req.params.id,
          method: 'GET',
        })
      })
      .then(({data}) => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
      })
  }
  static create(req, res) {
    let result = null
    axios({
      url: baseUrl,
      method: 'POST',
      data: req.body
    })
      .then(({data}) => {
        result = data
        res.status(201).json(data)
        return redis.get('movies')
      })
      .then(data => {
        console.log(data)
        if (data) {
          console.log('disanaa')
          data = JSON.parse(data)
          data.push(result)
          redis.set('movies', JSON.stringify(data))
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json('Internal Server Error')
      })
  }
  static update(req, res) {
    let temp = null
    axios({
      url: baseUrl + req.params.id,
      method: 'PUT',
      data: req.body
    })
      .then(({data}) => {
        temp = data
        res.status(201).json(data)
        return redis.get('movies')
      })
      .then(data => {
        console.log(data)
        if (data) {
          console.log('disinii')
          data = JSON.parse(data)
          const result = data.map(datum => {
            if (datum._id === req.params.id) {
              return temp
            }
            return datum
          })
          redis.set('movies', JSON.stringify(result))
        }
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
      })
  }
  static delete(req, res) {
    axios({
      url: baseUrl + req.params.id,
      method: 'DELETE',
    })
      .then(({data}) => {
        res.status(200).json(data)
        return redis.get('movies')
      })
      .then(data => {
        console.log(data)
        if (data) {
          console.log('disinii')
          data = JSON.parse(data)
          const filter = data.filter(datum => datum._id !== req.params.id)
          redis.set('movies', JSON.stringify(filter))
        }
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
      })
  }
}

module.exports = MovieController