const express = require('express');
// const adoptersRouter = require('./adopters/adopters-router');
// const dogsRouter = require('./dogs/dogs-router.js');
const server = express();

server.use(express.json()); // teaches express to read req.body as JSON

// server.use('/api/adopters', adoptersRouter);
// server.use('/api/dogs', dogsRouter);

// OTHER ENDPOINTS
// OTHER ENDPOINTS
// OTHER ENDPOINTS
server.get('/', (req, res) => {
  res.send(`
    <h2>Big Check</h>
  `);
});

module.exports = server;

