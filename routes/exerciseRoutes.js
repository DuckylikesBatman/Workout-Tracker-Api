const express = require('express');
const router = express.Router();

const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');

// CREATE EXERCISE
router.post('/exercises', async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    const saved = await exercise.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ADD EXERCISE TO WORKOUT (IMPORTANT 🔥)
router.post('/workouts/:workoutId/exercises/:exerciseId', async (req, res) => {
  try {
    const { workoutId, exerciseId } = req.params;

    // update workout
    const workout = await Workout.findByIdAndUpdate(
      workoutId,
      { $addToSet: { exercises: exerciseId } },
      { new: true }
    );

    // update exercise
    const exercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      { $addToSet: { workouts: workoutId } },
      { new: true }
    );

    res.json({ workout, exercise });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ALL EXERCISES
router.get('/exercises', async (req, res) => {
  const exercises = await Exercise.find()
    .populate('workouts');

  res.json(exercises);
});

module.exports = router;