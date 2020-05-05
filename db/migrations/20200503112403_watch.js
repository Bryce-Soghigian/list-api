
exports.up = function(knex) {
  return knex.schema.createTable("watch", table => {
    table.increments()
    table.integer("user_id").unsigned().references("id").inTable("users")
    table.text("list_item").notNullable()
    table.text("status")// To watch // watching // completed //dropped

})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("watch")
};
