const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE USER
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// GET ALL USERS
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET USER BY ID
router.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});
router.put('/users/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});
module.exports = router;