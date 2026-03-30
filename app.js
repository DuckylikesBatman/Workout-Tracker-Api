const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const feedbackRoutes = require('./routes/FeedbackRoutes');
const { sequelize } = require('./models/FeedBack');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/csc456DB';

app.use(express.json({ limit: '1mb' }));

// API routes
app.use('/', userRoutes);
app.use('/', workoutRoutes);
app.use('/', exerciseRoutes);
app.use('/', feedbackRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API running');
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await sequelize.authenticate();
    console.log('SQLite connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();