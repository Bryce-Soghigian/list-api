
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
        table.integer("user_id").unsigned().references("id").inTable("users")
        table.timestamp("date_created").defaultTo(knex.fn.now());
    })
    .createTable("episodes", table => {
        table.increments()
        table.integer("user_id").unsigned().references("id").inTable("users")
        table.integer("list_item_id").unsigned().references("id").inTable("listitems")
        table.integer("season_num")
        table.integer("episode_num")
        table.text("episode_description")
        table.text("episode_rating")

    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("episodes").dropTable("listitems").dropTable("users")
};
