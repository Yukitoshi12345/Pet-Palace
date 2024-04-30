const { User, Product, Category, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Added personal stripe API
const stripe = require("stripe")(
  "pk_test_51P8fzOP8oR1gIlWHcY2SE0w0DUHQfWcrTpjyyRwxvvxmshjHFf7pKFFT22jDQ5uYVOkvM0yQQnDch5AkF7Cj8qOB00HelqLVDV"
);

// TODO: Complete this section
const resolvers = {
  Query: {
    user: async (parent, args, context) => {
        if (context.user) {
            const user = await User.findOne({ _id: context.user._id });
            return user;
        } 
        throw AuthenticationError;
    }
}, 

Mutation: {
    login: async (parent, { email, password }) => {
        // Check if the email exists in the database 
        const user = await User.findOne({ email });

        if (!user) {
            throw AuthenticationError;
        }

        // Validate that the password is correct 
        const isPwCorrect = await user.isCorrectPassword(password);

        if (!isPwCorrect) {
            throw AuthenticationError;
        }

        // Return token and user 
        const token = signToken(user);
        return { token, user };
    },

    addUser: async (parent, { email, password }) => {
        // Create the user instance and return it with token 
        const user = await User.create(
            {
                email: email,
                password: password,
            }
        );

        const token = signToken(user);
        return { token, user };
    },
  }
}  

module.exports = resolvers;
