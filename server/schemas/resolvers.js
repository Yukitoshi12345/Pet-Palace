const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
require('dotenv').config();
// Added personal stripe API
const stripeAPI = process.env.Stripe_API_KEY;
const stripe = require('stripe')(stripeAPI);

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { email }) => {
      return User.findOne({ email });
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

    addUser: async (parent, { name, birthday, email, password }) => {
      const user = await User.create({
        name: name,
        birthday: birthday,
        email: email,
        password: password,
        role: 'user',
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
