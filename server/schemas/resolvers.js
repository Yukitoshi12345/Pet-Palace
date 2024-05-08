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
      return User.findOne({ _id: userId }).populate('favorites');
      
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

    changePassword: async (_, { currentPassword, newPassword, confirmPassword }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated.');
      }

      const user = await User.findById(context.user._id);
      if (!user) {
        throw new AuthenticationError('User not found.');
      }

      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        throw new UserInputError('Incorrect current password.');
      }

      if (newPassword !== confirmPassword) {
        throw new UserInputError("New password and confirm password don't match.");
      }
      if (newPassword.length < 5) {
        throw new UserInputError('New password must be at least 5 characters long.');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return true;
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
    }
  },
};


module.exports = resolvers;
