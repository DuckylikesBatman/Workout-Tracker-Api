const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: String,
  muscleGroup: String,
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }]
});

module.exports = mongoose.model('Exercise', exerciseSchema);