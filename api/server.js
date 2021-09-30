const express = require('express');
const Users = require('./users/model')
const server = express();

server.use(express.json()); 


server.get('/api/users', (req, res) => {
  Users.find(req.query)
  .then(user =>{
      res.status(200).json(user)
  }) 
  .catch(err =>{
      res.status(500).json({
          message: err.message,
      })
  })
});

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user =>{
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }
    }) 
    .catch(err =>{
        res.status(500).json({
            message: err.message
        })
    })
  });

  server.post("/api/users", (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({
        message: "Please provide name and bio for the post",
        });
    } else {
        Users.insert(req.body)
        .then((id) => {
            res.status(201).json({
                id: id,
                name: name,
                bio: bio
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
            message: 'Error retrieving the posts',
        });
    })
  }});

  server.put('/api/users', (req, res) => {
    Users.find(req.query)
    .then(user =>{
        res.status(200).json(user)
    }) 
    .catch(err =>{
        res.status(500).json({
            message: err.message
        })
    })
  });

  server.delete('/api/users', (req, res) => {
    Users.find(req.query)
    .then(user =>{
        res.status(200).json(user)
    }) 
    .catch(err =>{
        res.status(500).json({
            message: err.message
        })
    })
  });

server.get('*', (req, res) => {
    res.status(404).json({
        message: "not found"
    })
})

module.exports = server;

