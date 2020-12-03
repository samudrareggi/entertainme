require('./configs')
const express = require('express')
const app = express()
const PORT = 5002
const routes = require('./routes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
  console.log(PORT)
})