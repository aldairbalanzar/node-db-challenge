const db = require('../db-config');

module.exports = {
    find,
    findById,
    add,
    findTasks,
    findAllResources,
    addTask,
    findResources,
    addResource,
    insertResource,
    // addKeys
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

function findAllResources(){
    return db('resources')
}

function findResources(id){
    return db('projects')
    .select('resourceName')
    .from('projects_resources')
    .where('project_id', id)
    .join('resources', 'projects_resources.resource_id',
    'resources.id')
  };

function add(project){
    return db("projects")
    .insert(project, "id")
    .then(([id]) => {
      return findById(id);
    });
};

function addTask(newTask, id){
    return db('tasks')
      .insert(newTask, 'id')
      .then(() => {
          return findTasks(id)
      })
  };

  function addResource(newResource, id){
    return db('resources')
    .where('project_id')
    .insert(newResource, 'id')
    .then(db('projects_resources'))
  };

  function insertResource( project_id, resource ){ 
        return db('resources')    
            .insert(resource)    
            .then( ids => { return db( 'projects_resources' ) 
            .insert({ project_id: project_id, resource_id: ids[0] })        
            .then( () => {          
            return db( 'resources' )          
            .where( { id: ids[ 0 ] } )          
            .first();        
            });    
        } 
    );
}

//   function addKeys(project_id) {
//     return db('project_resources')
//         .where('project_id', id)
//         .insert(project_id);
// }


