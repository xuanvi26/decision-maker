
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('polls', function(table) {
            table.string('owner_name');
            table.string('description');
        }),
        knex.schema.alterTable('answers', function(table) {
            table.string('description');
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.alterTable('polls', function(table) {
          table.dropColumn('owner_name');
          table.dropColumn('description');
      }),
      knex.schema.alterTable('answers', function(table) {
          table.dropColumn('description');
      }),
  ])
};
