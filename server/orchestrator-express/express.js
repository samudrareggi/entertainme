const cors = require('cors')
const express = require('express')
const PORT = 5003
const app = express()
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
  console.log(PORT)
})