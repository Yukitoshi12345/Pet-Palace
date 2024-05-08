const { User, Pet, Donation } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('favorites');
      
    },

    pets: async (parent, { first, after }) => {
      const results = await Pet.find(
        after ? { _id: { $gt: new ObjectId(after) } } : {},
      )
        .sort({ name: 1, _id: 1 })
        .limit(first);

      const edges = results.map((pet) => ({
        node: pet,
        cursor: pet._id,
      }));

      const totalCount = await Pet.countDocuments();

      const pageInfo = {
        hasNextPage: edges.length < totalCount,
        endCursor: edges[edges.length - 1]?.cursor,
      };

      return { totalCount, edges, pageInfo };
    },

    allPets: async () => {
      return await Pet.find();
    },

    pet: async (parent, { petId }) => {
      return await Pet.findOne({ _id: petId });
    },

    featuredPets: async () => {
      return await Pet.find({ featured: true });
    },
    petTypes: async () => {
      return await Pet.find().distinct('type');
    },
    locations: async () => {
      return await Pet.find().distinct('location');
    },
    // breeds: async (parent, { petType }) => {
    //   return await Pet.find({ type: petType }).distinct('breed');
    // },
    // species: async (parent, { petType }) => {
    //   return await Pet.find({ type: petType }).distinct('species');
    // },
    petsByLocation: async (parent, { location }) => {
      return await Pet.find({ location: location });
    },
    petsByType: async (parent, { type }) => {
      return await Pet.find({ type: type });
    },
    //find the pets by breed or species
    //the given string may be breed or species
    petsByBreedOrSpecies: async (parent, { breedOrSpecies }) => {
      return await Pet.find({
        $or: [{ breed: breedOrSpecies }, { species: breedOrSpecies }],
      });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(user);

      return { token, user };
    },

    addUser: async (
      parent,
      { name, birthday, favoritePet, email, password },
    ) => {
      const user = await User.create({
        name: name,
        birthday: birthday,
        favoritePet: favoritePet,
        email: email,
        password: password,
        role: 'user',
      });

      const token = signToken(user);
      return { token, user };
    },

    changePassword: async (
      parent,
      { currentPassword, newPassword, confirmPassword },
      { user },
    ) => {
      if (!user) {
        throw new Error('User is not authenticated');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('New password and confirm password do not match');
      }

      const validPassword = await user.isValidPassword(currentPassword);
      if (!validPassword) {
        throw new Error('Current password is incorrect');
      }

      user.password = newPassword;
      await user.save();


  },
};


module.exports = resolvers;
