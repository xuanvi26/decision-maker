
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('polls', function(table) {
          table.increments();
          table.string('name');
          table.string('email')
        }),
        knex.schema.createTable('answers', function(table) {
          table.increments();
          table.string('name');
          table.integer('score');
          table.integer('poll_id').references('id').inTable('polls');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('polls'),
        knex.schema.dropTable('answers')
    ]);
};
