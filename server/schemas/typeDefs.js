const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    birthday: String!
    favoritePet: String!
    email: String!
    password: String!
  }

  type Payment {
    success: Boolean!
    chargeId: String
    error: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
  }

  type Mutation {
    addUser(
      name: String!
      birthday: String!
      favoritePet: String!
      email: String!
      password: String!
    ): Auth
    login(
      email: String!, 
      password: String!
    ): Auth
    createCharge(
      amount: Int!
      source: String!
      currency: String = "aud"
    ): Payment
  }
`;

module.exports = typeDefs;
