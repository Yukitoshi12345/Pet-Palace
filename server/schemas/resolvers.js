const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb');
require('dotenv').config();
// Added personal stripe API
const stripeAPI = process.env.Stripe_API_KEY;
const stripe = require('stripe')(stripeAPI);

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      // Convert the string userId to ObjectId
      const objectId = new ObjectId(userId);

      // Query the user by ObjectId
      return User.findOne({ _id: objectId });
    }
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

    addUser: async (parent, { name, birthday, favoritePet, email, password }) => {
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

    createCharge: async (parent, { amount, source, currency }) => {
      try {
        const charge = await stripe.charges.create({
          amount,
          currency,
          source,
        });
        return { success: true, chargeId: charge.id };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  },
};

module.exports = resolvers;
