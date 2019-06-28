const router = require('express').Router()

// Import data models
const db = require('../data/models')

//==== GET ====//
router.get('/', async (req, res) => {
  try {
    const data = await db.findAll('Users')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  try {

  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

//==== POST ====//
router.post('/', async (req, res) => {
  try {

  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

//==== DELETE ====//
router.delete('/:id', async (req, res) => {
  try {

  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router