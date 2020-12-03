const cors = require('cors')
const express = require('express')
const PORT = 5000
const app = express()
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
  console.log(PORT)
})