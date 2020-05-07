
exports.up = function(knex) {
  return knex.schema.createTable("friends",(table) =>{
        table.increments()
        table.integer("my_id").unsigned().references("id").inTable("users")
        table.integer("friend_id").unsigned().references("id").inTable("users")
        table.text("status")//sent, accepted, rejected
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("friends")
};
