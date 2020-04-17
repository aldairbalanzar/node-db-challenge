const express = require('express');

const router = express.Router();

const Projects = require('./projects-model');

//fetches list of projects
router.get('/', (req, res) => {
  Projects.find()
  .then(projects => res.status(200).json(projects))
  .catch(err => res.status(500).json({ message: 'Failed to get data for projects.'}))
});

//fetches particular project
router.get('/:id', (req, res) => {
  Projects.findById(req.params.id)
  .then(project => {
    project
    ?res.json(project)
    :res.status(404).json({ message: 'Could not find project with given id.' })
    }
  )
  .catch(err => {
    res.status(500).json({ message: 'Failed to get project.' });
  });
});

//fetches project's tasks
router.get('/:id/tasks', (req, res) => {
  Projects.findById(req.params.id)
  .then(project => {
    project
    ?Projects.findTasks(req.params.id)
    .then(tasks => {
        tasks
        ?res.status(200).json(tasks)
        :res.status(404).json({ message: 'The project with the specified ID does not have tasks.' });
    })
    :res.status(404).json({ message: 'The project with the specified ID does not exist.' })
    
  })
  .catch(err => {
      console.log('error: ', err );
      res.status(500).json({message: 'Error retrieving tasks.'});
  });
});

router.get('/:id/resources', (req, res) => {
  Projects.findById(req.params.id)
  .then(project => {
    project
    ?Projects.findResources(req.params.id)
    .then(resources => {
        !resources[0]
        ?res.status(404).json({ message: 'The project with the specified ID does not have resources.' })
        :res.status(200).json(resources)
    })
    :res.status(404).json({ message: 'The project with the specified ID does not exist.' })
    
  })
  .catch(err => {
      console.log('error: ', err );
      res.status(500).json({message: 'Error retrieving tasks.'});
  });
})

//posts a new project
router.post('/', (req, res) => {
  Projects.add(req.body)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project.' });
  });
});

//posts a task to the project
router.post('/:id/tasks', (req, res) => {
  Projects.findById(req.params.id)
  .then(project => {
    project
    ?Projects.addTask(req.body)
    .then(task => {
      res.status(201).json({ message: "susccesfuly added task." });
    })
    .catch(err => {
        console.log('error: ', err );
        res.status(500).json({message: 'Error adding task.'});
    })
    :res.status(400).json({ message: "could not find projects with that id." })
  })
  
});

//posts a new resource to project
router.post('/:id/resources', (req, res) => {
  Projects.findById(req.params.id)
  .then(project => {
    project
    ?Projects.addResource(req.body)
    .then(resource => {
      res.status(201).json({ message: "susccesfuly added resource." });
    })
    .catch(err => {
        console.log('error: ', err );
        res.status(500).json({message: 'Error adding resource.'});
    })
    :res.status(400).json({ message: "could not find projects with that id." })
  })
})

module.exports = router;