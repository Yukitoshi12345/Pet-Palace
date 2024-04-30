const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Added personal stripe API
const stripe = require("stripe")(
  "pk_test_51P8fzOP8oR1gIlWHcY2SE0w0DUHQfWcrTpjyyRwxvvxmshjHFf7pKFFT22jDQ5uYVOkvM0yQQnDch5AkF7Cj8qOB00HelqLVDV"
);

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

        addUser: async (parent, { name, birthday, email, password, confirmPassword }) => {
            // Create the user instance and return it with token 
            const user = await User.create(
                {
                    name: name,
                    birthday: birthday,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                }
            );

            const token = signToken(user);
            return { token, user };
        },
    },
}

module.exports = resolvers;
