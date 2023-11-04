const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const entry = require('./routes/entry')
const parkingSpot = require('./routes/parkingSpot')
const payment = require('./routes/payment')
const user = require('./routes/user')

app.use(express.json())

app.use('/entries', entry)
app.use('/parkingSpots', parkingSpot)
app.use('/payments', payment)
app.use('/users', user)

module.exports = app