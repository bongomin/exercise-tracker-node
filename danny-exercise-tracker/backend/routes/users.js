const express = require('express');
const router  = express.Router();
var User = require('../models/user.model')

// find all users

router.get('/' ,(req,res) => {
   User.find({})
   .then(users => res.json(users) )
   .catch(err => res.status(400).json('Error :' +err))
})

router.post('/add' ,(req,res) => {
   // User.create(req.body)
   const username = req.body.username;
   const newUser = new User({username});
   newUser.save()
   .then( () => res.json('new user added'))
   .catch((err) => res.status(400).json('Error'+err))
})











module.exports =router;