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
  const { id } = req.params
  try {
    const data = await db.findById('Users', id)
    if (data) {
      res.send(data)
    } else {
      res.status(404).json({ message: `Record ${id} not found` })
    }
   
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

//==== POST ====//
router.post('/', async (req, res) => {
  try {
    const data = await db.insert('Users', req.body)
    res.status(201).send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

//==== DELETE ====//
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await db.remove('Users', id)
    if (data <= 0) throw err
    else {
      res.json({ message: `Successfully deleted record ${id}` })
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router