const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
require('dotenv').config();
// Added personal stripe API
const stripeAPI = process.env.Stripe_API_KEY;
const stripe = require('stripe')(stripeAPI);

// TODO: Complete this section
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addUser: async (parent, { name, birthday, email, password }) => {
      // Create the user instance and return it with token
      const user = await User.create({
        name: name,
        birthday: birthday,
        email: email,
        password: password,
      });

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
