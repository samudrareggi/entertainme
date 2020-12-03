const { MongoClient } = require('mongodb')
const databaseUrl = "mongodb://localhost:27017/"

const client = new MongoClient(databaseUrl, { useUnifiedTopology: true })

client.connect()

const db = client.db('entertain-me-movies')

module.exports = db