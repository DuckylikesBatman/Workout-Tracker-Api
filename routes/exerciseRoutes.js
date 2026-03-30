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

// GET ALL EXERCISES
router.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find().populate('workouts');
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET EXERCISE BY ID
router.get('/exercises/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id).populate('workouts');
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE EXERCISE
router.put('/exercises/:id', async (req, res) => {
  try {
    const updated = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Exercise not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE EXERCISE
router.delete('/exercises/:id', async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exercise deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ADD EXERCISE TO WORKOUT (many-to-many link)
router.post('/workouts/:workoutId/exercises/:exerciseId', async (req, res) => {
  try {
    const { workoutId, exerciseId } = req.params;

    const workout = await Workout.findByIdAndUpdate(
      workoutId,
      { $addToSet: { exercises: exerciseId } },
      { new: true }
    );

    const exercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      { $addToSet: { workouts: workoutId } },
      { new: true }
    );

    if (!workout || !exercise) {
      return res.status(404).json({ error: 'Workout or Exercise not found' });
    }

    res.json({ workout, exercise });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;