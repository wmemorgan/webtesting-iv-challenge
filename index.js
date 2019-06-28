require('dotenv').config()

const server = require('./api/server')

const port = process.env.PORT || 5300

server.listen(port, () => console.log(`Testing IV API server running on port ${port}`))