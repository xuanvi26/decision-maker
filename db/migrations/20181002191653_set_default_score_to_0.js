
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.raw('alter table answers alter score set default 0')
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.raw('alter table answers alter score set default null')
    ])
};
