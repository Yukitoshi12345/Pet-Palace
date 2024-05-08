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

    pets: async (parent, { first, after }) => {
      const results = await Pet.find(
        after ? { _id: { $gt: new ObjectId(after) } } : {},
      )
        .sort({ name: 1 , _id: 1 })
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

    Mutation: {
      changePassword: async (parent, { currentPassword, newPassword, confirmPassword }, { user }) => {
        
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
  
        return true; 
      }
    },
  },
};

module.exports = resolvers;
