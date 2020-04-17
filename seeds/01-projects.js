exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').insert([
        {projectName: 'test 1'},
        {projectName: 'test 2'},
        {projectName: 'test 3'}
      ]);
    };

