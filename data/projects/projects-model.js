const db = require('../db-config');

module.exports = {
    find,
    findById,
    add,
    findTasks,
    addTask,
    findResources,
    addResource
}

function find(){
    return db('projects')
};

function findById(id){
    return db('projects')
    .where({id})
    .first()
};

function findTasks(id){
    return db('projects')
    .select('projects.projectName',
     'projects.description',
     'tasks.taskDescription')
    .join("tasks", "projects.id",
     "tasks.project_id")
    .where('projects.id', id)
};

function add(project){
    return db("projects")
    .insert(project, "id")
    .then(([id]) => {
      return findById(id);
    });
};

function addTask(newTask){
    return db('tasks')
      .insert(newTask)
      .then(ids => {
          return ids
      })
  };

  function findResources(id){
    return db('projects')
    .select('resourceName')
    .from('projects_resources')
    .where('project_id', id)
    .join('resources', 'projects_resources.resource_id',
    'resources.id')
  };

  function addResource(newResource){
    return db('resources')
    .insert({resourceName: newResource})
    .then(db('projects_resources')
            .insert([{project_id: projectId, resource_id: resourceId}]))
  };