const express = require('express');
const Users = require('./users/model')
const server = express();

server.use(express.json()); 


server.get('/api/users', (req, res) => {
  Users.find(req.query)
  .then(user =>{
      res.status(200).json(user)
  })
});

server.get('*', (req, res) => {
    res.status(404).json({
        message: "not found"
    })
})

module.exports = server;

