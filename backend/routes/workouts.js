const express = require('express');
const router = express.Router();
const Workout = require('../models/workoutModel.js')
const requireAuth = require('../middleware/requireAuth.js')
const {
createWorkout,
getAllWorkouts,
getWorkout,
deleteWorkout,
updateWorkout
}= require('../controllers/workoutController.js')

router.use(requireAuth)

router.get('/',getAllWorkouts)

router.get('/:id',getWorkout)

router.post('/',createWorkout)

router.delete('/:id',deleteWorkout)

router.patch('/:id',updateWorkout)

module.exports=router