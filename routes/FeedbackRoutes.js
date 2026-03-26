const express = require('express');
const router = express.Router();
const Feedback = require('../models/FeedBack');

router.post('/feedback', async (req, res) => {
  const feedback = await Feedback.create(req.body);
  res.json(feedback);
});

router.get('/feedback', async (req, res) => {
  const feedback = await Feedback.findAll();
  res.json(feedback);
});

module.exports = router;