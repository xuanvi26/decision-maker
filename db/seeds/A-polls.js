exports.seed = function(knex, Promise) {
  return knex('answers').del()
    .then(function () {
      return knex('polls').del()
        .then(function () {
          return Promise.all([
            knex('polls').insert({owner_name: "Xuan-Vi Kurian", email: 'JerVi@Kutrinh.com', name: 'Where do you want to eat tonight?', description: 'Let me know where you want to eat tonight so I can book a reservation!'}),
          ]);
        })
    });
};
