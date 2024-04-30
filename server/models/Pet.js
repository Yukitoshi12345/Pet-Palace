const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Type of pet is required'],
      enum: ['Dog', 'Cat', 'Hamster', 'Bird', 'Rabbit'],
    },
    variety: {
      // Generic term that can refer to breed or species
      type: String,
      required: [
        true,
        'Breed or species is required depending on the type of pet',
      ],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age must be a positive number'],
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    health: {
      type: String,
      required: [false, 'Health status is optional'],
    },
    tame: {
      type: Boolean,
      required: [false, 'Tameness is optional'],
      default: false,
    },
    specialNeeds: {
      type: String,
      required: [false, 'Special needs are optional'],
    },
    vaccinationHistory: {
      type: String,
      required: [true, 'Vaccination history is required'],
    },
    disability: {
      type: String,
      default: 'None',
    },
    pedigreeKnown: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      required: [true, 'Photo URL is required'],
    },
    owner: {
      type: Schema.Types.ObjectId, // References an ObjectId
      ref: 'User', // The owner data is stored in a User collection
      required: [true, 'Owner is required'],
    },
  },
  {
    timestamps: true,
  },
);

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
