const { User, Pet, Donation } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb');
require('dotenv').config();
// Added personal stripe API
const stripeAPI = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(stripeAPI);

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    pets: async (parent, { first, after }) => {
      const results = await Pet.find(
        after ? { _id: { $gt: new ObjectId(after) } } : {},
      )
        .sort({ _id: 1 })
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
    breedsOrSpecies: async (parent, { petType }) => {
      const breeds = await Pet.find({ type: petType }).distinct('breed');
      const species = await Pet.find({ type: petType }).distinct('species');
      const header = breeds.length > 0 ? 'All Breeds' : 'All Species';
      return [header, ...breeds, ...species];
    },
    petsBySearchCriteria: async (
      parent,
      { location, petType, speciesBreed },
    ) => {
      let results = [];
      if (location === 'All Locations' && petType === 'All Pet Types') {
        results = await Pet.find();
      } else if (location === 'All Locations') {
        if (speciesBreed === 'All Breeds' || speciesBreed === 'All Species') {
          results = await Pet.find({ type: petType });
        } else {
          results = await Pet.find({
            type: petType,
            $or: [{ species: speciesBreed }, { breed: speciesBreed }],
          });
        }
      } else if (petType === 'All Pet Types') {
        results = await Pet.find({ location: location });
      } else {
        if (speciesBreed === 'All Breeds' || speciesBreed === 'All Species') {
          results = await Pet.find({ location: location, type: petType });
        } else {
          results = await Pet.find({
            location: location,
            type: petType,
            $or: [{ species: speciesBreed }, { breed: speciesBreed }],
          });
        }
      }
      return results;
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

    createCheckoutSession: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;

      const donation = await Donation.create({
        amount: args.amount,
        donor: context.user._id,
        message: args.message,
      });

      const line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
              images: [`${url}/images/donation.png`],
            },
            unit_amount: args.amount * 100,
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/cancel`,
      });

      return { session: session.id };
    },
  },
};

module.exports = resolvers;
