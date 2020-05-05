
exports.up = function(knex) {
  return knex.schema.createTable("episode", table => {
    table.increments()
    table.integer("list_item_id").unsigned().references("id").inTable("listitems")
    table.integer("season_num")
    table.integer("episode_num")
    table.text("episode_description")
    table.text("episode_rating")

})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("episode")
};
