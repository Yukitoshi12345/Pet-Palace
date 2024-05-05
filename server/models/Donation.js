const mongoose = require('mongoose');
const { Schema } = mongoose;

const donationSchema = new Schema({
  donationDate: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
