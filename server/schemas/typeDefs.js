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

  type DonateResponse {
    id: String!
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
    petsBySearchCriteria(location: String, petType: String, speciesBreed: String): [Pet]
    breedsOrSpecies(petType: String!): [String]
    me: User
    emailExists(email: String!): Boolean!
  }

  type Mutation {
    addUser(
      name: String!
      birthday: String!
      favoritePet: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addFavorite(petId: ID!): User
    removeFavorite(petId: ID!): User
    donateAmount(amount: String!): DonateResponse!
  }

`;

module.exports = typeDefs;
