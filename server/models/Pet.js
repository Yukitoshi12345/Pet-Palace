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
    species: {
      type: String,
      required: [
        false,
        'Species is optional, but it is recommended to provide it for better search results',
      ],
    },
    breed: {
      type: String,
      required: [
        false,
        'Breed  is optional, but it is recommended to provide it for better search results',
      ],
    },
    gender: {
      type: String,
      required: [false, 'Gender is optional, because it is not always known'],
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
      default: 'Unknown',
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
    // owner: {
    //   type: Schema.Types.ObjectId, // References an ObjectId
    //   ref: 'User', // The owner data is stored in a User collection
    //   required: [true, 'Owner is required'],
    // },
  },
  {
    timestamps: true,
  },
);

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
