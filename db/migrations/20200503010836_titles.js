
exports.up = function(knex) {
  return knex.schema.createTable("titles", (table) =>{
      table.increments()
      table.text("titles")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("titles")
};
