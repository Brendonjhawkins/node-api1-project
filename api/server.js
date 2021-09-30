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
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({
        message: "Please provide name and bio for the post",
        });
    } else {
        Users.insert(user)
        .then((id) => {
            res.status(201).json(id);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
            message: 'Error retrieving the posts',
        });
    })
  }});

  server.put('/api/users/:id', async (req, res) => {
    try{
        const possUser = await Users.findById(req.params.id)
        if(!possUser) {
            res.status(404).json(
                { message: "The user with the specified ID does not exist" }
            )
        } else {
            if(!req.body.name || !req.body.bio) {
                res.status(400).json(
                    { message: "Please provide name and bio for the user" }
                )
            } else{
               const updatedUser = await Users.update(req.params.id, req.body)
               res.status(200).json(updatedUser)
            }
        } 
       } catch(err){
        console.log(err);
                res.status(500).json({
                message: 'Error retrieving the posts',
            });
       }
  });

  server.delete('/api/users/:id', async (req, res) => {
   try{
    const possUser = await Users.findById(req.params.id)
    if(!possUser) {
        res.status(404).json(
            { message: "The user with the specified ID does not exist" }
        )
    } else {
        const removedUser = await Users.remove(possUser.id)
        res.status(200).json(removedUser)
    }
   } catch(err){
    console.log(err);
            res.status(500).json({
            message: 'Error retrieving the posts',
        });
   }
  });

server.get('*', (req, res) => {
    res.status(404).json({
        message: "not found"
    })
})

module.exports = server;

