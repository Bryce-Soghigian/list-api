
exports.up = function(knex) {
  return knex.schema.createTable("titles", (table) =>{
      table.integer("id")
      table.text("titles")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("titles")
};
