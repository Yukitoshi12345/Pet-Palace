const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    birthday: Date!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Auth {
    token: ID! 
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
  }

  type Mutation {
    addUser(name: String!, birthday: Date!, email: String!, password: String!, confirmPassword: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
