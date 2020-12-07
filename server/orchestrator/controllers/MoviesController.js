const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const baseUrl = 'http://localhost:5001/movies/'

class MovieController {
  static find() {
    return redis.get('movies')
      .then(data => {
        if (data) {
          return { data: JSON.parse(data) }
        }
        return axios({
          url: baseUrl,
          method: 'GET'
        })
      })
      .then(({data}) => {
        redis.set('movies', JSON.stringify(data))
        return data
      })
      .catch(err => {
        console.log(err.message)
        return err.message
      })
  }
  static findById(id) {
    return redis.get('movies')
      .then(data => {
        if (data) {
          data = JSON.parse(data)
          const filter = data.filter(datum => datum._id === id)
          if (filter.length) {
            return { data: filter[0] }
          }
        }
        return axios({
          url: baseUrl + id,
          method: 'GET',
        })
      })
      .then(({data}) => {
        return data
      })
      .catch(err => {
        console.log(err.message)
        return err.message
      })
  }
  static create(payload) {
    return axios({
      url: baseUrl,
      method: 'POST',
      data: payload
    })
      .then(({data}) => {
        redis.del('movies')
        return data
      })
      .catch(err => {
        console.log(err)
        return err.message
      })
  }
  static update(id, payload) {
    return axios({
      url: baseUrl + id,
      method: 'PUT',
      data: payload
    })
      .then(({data}) => {
        redis.del('movies')
        return data
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
      })
  }
  static delete(id) {
    return axios({
      url: baseUrl + id,
      method: 'DELETE',
    })
      .then(({data}) => {
        redis.del('movies')
        return data
      })
      .catch(err => {
        console.log(err.message)
        return err.message
      })
  }
}

module.exports = MovieController