const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donationAmount: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  donationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
