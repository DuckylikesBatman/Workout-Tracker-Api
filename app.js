const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const feedbackRoutes = require('./routes/FeedbackRoutes');


const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/csc456DB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ✅ ROUTES (THIS IS THE IMPORTANT PART)
app.use('/', userRoutes);
app.use('/', workoutRoutes);
app.use('/', exerciseRoutes);
app.use('/', feedbackRoutes);

// test route
app.get('/', (req, res) => {
  res.send('API running');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});