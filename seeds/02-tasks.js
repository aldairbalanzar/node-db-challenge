exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').insert([
        {project_id:1, taskDescription: 'test 1'},
        {project_id:1, taskDescription: 'test 2'},
        {project_id:1, taskDescription: 'test 3'},
        {project_id:2, taskDescription: 'test 3'},
        {project_id:3, taskDescription: 'test 3'}
      ]);
    };
