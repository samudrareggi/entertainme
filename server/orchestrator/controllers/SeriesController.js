const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const baseUrl = 'http://localhost:5002/tv/'

class SeriesController {
  static find() {
    return redis.get('series')
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
        redis.set('series', JSON.stringify(data))
        return data
      })
      .catch(err => {
        console.log(err.message)
        return err.message
      })
  }
  static findById(id) {
    return redis.get('series')
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
    let result = null
    return axios({
      url: baseUrl,
      method: 'POST',
      data: payload
    })
      .then(({data}) => {
        result = data
        return redis.get('series')
      })
      .then(data => {
        if (data) {
          data = JSON.parse(data)
          data.push(result)
          redis.set('series', JSON.stringify(data))
        }
        return result
      })
      .catch(err => {
        console.log(err)
        return err.message
      })
  }
  static update(id, payload) {
    let temp = null
    return axios({
      url: baseUrl + id,
      method: 'PUT',
      data: payload
    })
      .then(({data}) => {
        console.log(data)
        temp = data
        return redis.get('series')
      })
      .then(data => {
        if (data) {
          data = JSON.parse(data)
          const result = data.map(datum => {
            if (datum._id === id) {
              return temp
            }
            return datum
          })
          redis.set('series', JSON.stringify(result))
          return temp
        }
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
      })
  }
  static delete(id) {
    let result = null
    return axios({
      url: baseUrl + id,
      method: 'DELETE',
    })
      .then(({data}) => {
        result = data
        console.log('disini')
        return redis.get('series')
      })
      .then(data => {
        if (data) {
          data = JSON.parse(data)
          const filter = data.filter(datum => datum._id !== id)
          redis.set('series', JSON.stringify(filter))
        }
        return result
      })
      .catch(err => {
        console.log(err.message)
        return err.message
      })
  }
}

module.exports = SeriesController