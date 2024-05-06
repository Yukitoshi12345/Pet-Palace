const { User, Pet } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb');
require('dotenv').config();
// Added personal stripe API
const stripeAPI = process.env.Stripe_API_KEY;
const stripe = require('stripe')(stripeAPI);

const resolvers = {
  Query: {

    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    
    
    pets: async (parent, { first, after }) => {
      // let query = {};
      // if (after) {
      //   query = { _id: { $gt: new ObjectId(after) } };
      // }
      // tell mongoose to fetch next set of pets after the cursor
      const results = await Pet.find(after ? { _id: { $gt: new ObjectId(after) } } : {}).sort({ name: 1 }).limit(first || 6);
      
      const edges = results.map((pet) => ({
        node: pet,
        cursor: pet._id,
      }));
      const totalCount = await Pet.countDocuments();
      const pageInfo = {
        hasNextPage: edges.length < totalCount,
        hasPreviousPage: !!after,
        startCursor: edges[0].cursor,  
        endCursor: edges[edges.length - 1].cursor
      };
      return { totalCount, edges, pageInfo };
    },

    featuredPets: async () => {
      return Pet.find({ featured: true });
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
