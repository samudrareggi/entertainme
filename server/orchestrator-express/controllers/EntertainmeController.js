const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()


class EntertainmeController {
  static find(req, res) {
    let movies = null
    let tvSeries = null
    let entertainme = null
    redis.get('entertainme')
      .then(data => {
        if (data) {
          entertainme = data
          res.status(200).json(JSON.parse(data))
        }
          return axios({
            url: 'http://localhost:5001/movies/',
            method: 'GET'
          })
      })
      .then(({data}) => {
        if (data) {
          movies = data
          return axios({
            url: 'http://localhost:5002/tv/',
            method: 'GET'
          })
        }
      })
      .then(({data}) => {
        if (!entertainme) {
          tvSeries = data
          redis.set('entertainme', JSON.stringify({movies, tvSeries}))
          res.status(200).json({movies, tvSeries})
        }
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json('Internal Server Error')
      })
  }
}

module.exports = EntertainmeController