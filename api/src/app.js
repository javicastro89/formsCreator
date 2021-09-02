const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes/forms')


const server = express()


server.use(cors())
server.use(express.json())
server.use(morgan('dev'))

server.use('/', router)

module.exports = server;
