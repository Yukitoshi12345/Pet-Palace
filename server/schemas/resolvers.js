const { User, Product, Category, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Added personal stripe API
const stripe = require("stripe")(
  "pk_test_51P8fzOP8oR1gIlWHcY2SE0w0DUHQfWcrTpjyyRwxvvxmshjHFf7pKFFT22jDQ5uYVOkvM0yQQnDch5AkF7Cj8qOB00HelqLVDV"
);

// TODO: Complete this section
const resolvers = {};

module.exports = resolvers;
