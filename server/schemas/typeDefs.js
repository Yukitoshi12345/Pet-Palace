const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    birthday: String!
    favoritePet: String!
    email: String!
    password: String!
    role: String!
  }
  type Pet {
    _id: ID!
    name: String!
    type: String!
    breed:  String
    species: String
    gender: String!
    age: Float
    color: String!
    description: String!
    location: String!
    health: String
    tame: Boolean
    specialNeeds: String
    vaccinationHistory: String
    disability: String
    pedigreeKnown: Boolean
    photo: String!
    featured: Boolean
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
    users: [User]
    user(userId: ID!): User
    pets: [Pet]
    pet(_id: ID!): Pet
    featuredPets : [Pet]
  }

  type Mutation {
    addUser(
      name: String!
      birthday: String!
      favoritePet: String!
      email: String!
      password: String!
      role: String!
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
