const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  muscleGroup: {
    type: String,
    required: true
  },
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }]
});

module.exports = mongoose.model('Exercise', exerciseSchema);