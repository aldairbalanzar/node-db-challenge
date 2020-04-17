const express = require('express');
const helmet = require('helmet');

const projectsRouter = require('./data/projects/projectsRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'hey!'})
});

server.use('/api/projects', projectsRouter);

module.exports = server;