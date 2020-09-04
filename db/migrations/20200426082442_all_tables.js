//The two primary relational tables
exports.up = function(knex) {
return knex.schema
    .createTable("users", table => {
        table.increments();
        table.text("username",20).notNullable().unique()
        table.text("password", 20).notNullable()
    })
    .createTable("listitems", table => {
      table.increments();
      table.text("listItem")
      table.text("description")
      table.text("rating")//S A B C D F
      table.text("genre")
      // table.text("status")// To watch // watching // completed //dropped
      table.integer("user_id").unsigned().references("id").inTable("users")
      table.timestamp("date_created").defaultTo(knex.fn.now());
  })


};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("listitems").dropTable("users")};
