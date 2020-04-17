const express = require('express');

const router = express.Router();

const Projects = require('./projects-model');

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
  

module.exports = router;