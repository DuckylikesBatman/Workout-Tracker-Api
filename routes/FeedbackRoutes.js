const express = require('express');
const router = express.Router();
const { Feedback } = require('../models/FeedBack');

// CREATE FEEDBACK
router.post('/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ALL FEEDBACK
router.get('/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.findAll();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET FEEDBACK BY ID
router.get('/feedback/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE FEEDBACK
router.put('/feedback/:id', async (req, res) => {
  try {
    const [updated] = await Feedback.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Feedback not found' });
    const updatedFeedback = await Feedback.findByPk(req.params.id);
    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE FEEDBACK
router.delete('/feedback/:id', async (req, res) => {
  try {
    await Feedback.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;