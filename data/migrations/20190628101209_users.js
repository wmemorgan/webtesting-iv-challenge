
exports.up = async function(knex) {
  await knex.schema.createTable('Users', tbl => {
    tbl.increments()
    tbl.string('name').unique().notNullable()
    tbl.string('email').unique()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Users')
};
