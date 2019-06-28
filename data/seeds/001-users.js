
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').truncate()
  // Seed with test data
  await knex('Users').insert([
    { id: 1, name: 'George', email: 'george@mail.com'},
    { id: 2, name: 'Steve', email: 'steve@gmail.com'},
    { id: 3, name: 'Harry', email: 'harry@hotmail.com'},
  ])

};
