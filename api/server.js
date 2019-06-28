const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// Instantiate server
const server = express()

// Import routes
const userRoutes = require('../routes/userRoutes')

// Load middleware
server.use(express.json())
server.use(helmet())
server.use(cors())

// Route handling
server.use('/api/users', userRoutes)
server.use('/api', (req, res) => {
  res.json({ status: 'up' })
})
server.use('/', (req, res) => {
  res.send(`<h1>Testing IV Project API server</h1>`)
})

module.exports = server