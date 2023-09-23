const express = require('express')
const route = require('./routes')

const app = express()

app.use(express.json())

app.use('/v1', route)


app.get('/', (req, res) => {
    res.send('Express server is up and running.')
})

module.exports = app