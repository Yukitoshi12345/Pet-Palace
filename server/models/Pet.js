const mongoose = require('mongoose');

const { Schema } = mongoose;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0.99,
  },
  breed: {
    type: String,
  },
  species: {
    type: String,
  },
  color: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },

  // TODO: yet to complete
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
