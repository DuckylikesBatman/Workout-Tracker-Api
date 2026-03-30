const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const User = require('../models/User');

// CREATE WORKOUT (linked to user)
router.post('/workouts', async (req, res) => {
  try {
    const { title, user } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const workout = new Workout({
      title,
      user,
      date: new Date()
    });

    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ALL WORKOUTS (with user + exercises)
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find()
      .populate('user')
      .populate('exercises');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET WORKOUT BY ID
router.get('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('user')
      .populate('exercises');
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE WORKOUT
router.put('/workouts/:id', async (req, res) => {
  try {
    const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Workout not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE WORKOUT
router.delete('/workouts/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;