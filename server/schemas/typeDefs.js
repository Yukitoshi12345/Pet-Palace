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
    favorites: [Pet!]
  }
  type Pet {
    _id: ID!
    name: String!
    type: String!
    breed: String
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

  type Auth {
    token: ID!
    user: User
  }

  type CheckoutSession {
    session: ID!
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
    login(email: String!, password: String!): Auth
    changePassword(currentPassword: String!, newPassword: String!, confirmPassword: String!): Boolean!
    createCheckoutSession(amount: Int!, message: String): CheckoutSession
    addFavorite(petId: ID!): User
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
  }

  type PetEdge {
    node: Pet!
    cursor: String!
  }

  type PetConnection {
    totalCount: Int!
    edges: [PetEdge!]!
    pageInfo: PageInfo!
  }
  type Query {
    users: [User]
    user(userId: ID!): User
    allPets: [Pet]
    pets(first: Int, after: String): PetConnection!
    pet(petId: ID!): Pet
    featuredPets: [Pet]
    petTypes: [String]
    locations: [String]
    # breeds(petType: String!): [String]
    # species(petType: String!): [String]
    petsByLocation(location: String!): [Pet]
    petsByType(type: String!): [Pet]
    petsByBreedOrSpecies(breedOrSpecies: String): [Pet]
  }
`;

module.exports = typeDefs;
