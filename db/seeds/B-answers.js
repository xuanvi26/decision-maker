
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
      return knex('polls').first('*').then(function(row) {
        return Promise.all([
          knex('answers').insert({name: 'Kantapia', score: 3, description: 'Korean food', poll_id: row.id}),
          knex('answers').insert({name: 'Pho Rachel', score: 5, description: 'Vietnamese food', poll_id: row.id}),
          knex('answers').insert({name: 'McDonalds', score: 1, poll_id: row.id}),
        ]);
      });
};
