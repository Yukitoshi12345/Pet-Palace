const { User, Pet, Donation } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb');
require('dotenv').config();
// const stripe = require('stripe')('sk_test_51P8fzOP8oR1gIlWHOAxxL48oujcu144dZBk3bxsO6kTy6qNo6i1FN1vEc5LU7JtZcLqQ778SsYIlGCI5vbiRyvXa00YWa3uMG1')

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
      });

      const token = signToken(user);
      return { token, user };
    },

    addFavorite: async (parent, { petId }, context) => {
  
      if (!context.user) {
        throw new AuthenticationError('User not authenticated.');
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { favorites: petId } },
          { new: true } 
        );

        return updatedUser;
      } catch (error) {
        console.error('Error adding favorite:', error);
        throw new Error('Error adding favorite.');
      }
    },
    
    removeFavorite: async (parent, { petId }, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      try {
        const user = await User.findById(context.user._id);

        if (!user) {
          throw new Error('User not found');
        }

        user.favorites = user.favorites.filter(favorite => favorite.toString() !== petId);
        await user.save();

        return user;
      } catch (error) {
        console.error('Error removing favorite:', error);
        throw new Error('Failed to remove favorite');
      }
    },
    
    // donate: async (parent, { amount }) => {
    //   try {
    //     const paymentIntent = await stripe.paymentIntents.create({
    //       amount: amount * 100, 
    //       currency: 'aud',
    //     });

    //     return paymentIntent.client_secret;
    //   } catch (error) {
    //     console.error('Error processing donation:', error);
    //     throw new Error('Failed to process donation. Please try again.');
    //   }
    // },  
  },
};


module.exports = resolvers;
