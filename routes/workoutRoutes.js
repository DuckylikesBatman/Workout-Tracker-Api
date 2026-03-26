const express = require('express');
const router = express.Router();

const Workout = require('../models/Workout');
const User = require('../models/User');

// CREATE WORKOUT (linked to user)
router.post('/workouts', async (req, res) => {
  try {
    const { title, user } = req.body;

    // check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workout = new Workout({
      title,
      user
    });

    const savedWorkout = await workout.save();

    res.status(201).json(savedWorkout);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// GET ALL WORKOUTS (with user + exercises)
router.get('/workouts', async (req, res) => {
  const workouts = await Workout.find()
    .populate('user')
    .populate('exercises');

  res.json(workouts);
});
router.put('/workouts/:id', async (req, res) => {
  const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/workouts/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: 'Workout deleted' });
});

module.exports = router;