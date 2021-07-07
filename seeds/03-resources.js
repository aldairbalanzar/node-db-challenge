exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').insert([
    {resourceName: 'resource test 1'},
    {resourceName: 'resource test 2'},
    {resourceName: 'resource test 3'},
      ]);
    };
