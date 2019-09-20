const express = require('express');
const router  = express.Router();
var Exercise = require('../models/exercise.model')

// find all Exercises
router.get('/' ,(req,res) => {
   Exercise.find({})
   .then(exercises => res.json(exercises) )
   .catch(err => res.status(400).json('Error :' +err))
})

// adding single exercise
router.get('/:id' ,(req,res) => {
   Exercise.findOne({_id:req.params.id})
   .then((singleExecise) => {
      res.json(singleExecise);
   })
   .catch(err => res.status(400).json('Error:'+err))
})

// Deleting exercise
router.delete('/:id' ,(req,res) => {
   Exercise.findByIdAndDelete(req.params.id)
   .then(()=> {
      res.json('Exercise Removed')
   })
   .catch(err => res.status(400).json('Error:'+err))
})


// post method for exercises
router.post('/add' , (req,res) => {
   // User.create(req.body)
   var username = (req.body.username);
   var description = (req.body.description);
   var duration = Number(req.body.duration);
   var date =  Date.parse(req.body.date);

   var newExercise = new Exercise({
      username,description,duration,date
   });

   newExercise.save()
   .then( () => res.json('new Exercise added'))
   .catch((err) => res.status(400).json('Error'+err))
})

// updating content

router.put('/update/:id' , (req,res) => {

   Exercise.findById(req.params.id)
   .then((exercises) => {
      exercises.username    = (req.body.username);
      exercises.description = (req.body.description);
      exercises.duration    = Number(req.body.duration);
      exercises.date        =  Date.parse(req.body.date);
      exercises.save()
   .then( () => res.json('Execises Updated SuccessFully'))
   .catch((err) => res.status(400).json('Error'+err))

   })
   .catch(err => {res.status(400).json('Error:' +err)});

   
})



module.exports =router;