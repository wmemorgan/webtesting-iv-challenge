// Instantiate database instance

const db = require('../dbConfig')

//==== Global Database Methods ====//
function findAll(table) {
  return db(table).orderBy('id')
}

function findById(table, id) {
  return db(table).where({ id }).first()
}

async function insert(table, data) {
 try {
   const [id] = await db(table).insert(data)
   return await findById(table, id)
 }
 catch (err) {
   return err
 }
}

async function remove(table, id) {
  try {
    const count = await db(table).where({ id }).del()
    if (count > 0) {
      return {
        message: `${count} ${count > 1 ?
          'records': 'record'} deleted`
      }
    }
  }
  catch (err) {
    return err
  }
  
}

module.exports = {
  db,
  findAll,
  findById,
  insert,
  remove
}