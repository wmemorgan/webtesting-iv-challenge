const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// Instantiate server
const server = express()

// Import routes

// Load middleware
server.use(express.json())
server.use(helmet())
server.use(cors())

// Route handling
server.use('/', (req, res) => {
  res.json({ status: 'up' })
})

module.exports = server