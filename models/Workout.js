const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: String,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }]
});

module.exports = mongoose.model('Workout', workoutSchema);