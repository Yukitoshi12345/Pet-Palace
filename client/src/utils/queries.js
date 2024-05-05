import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      name
      birthday
      favoritePet
      email  
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      birthday
      favoritePet
      email  
    }
  }
`;

export const QUERY_PETS = gql`
  query pets {
    pets {
      _id
      name
      breed
      species
      age
      color
      description
      location
      photo
      featured
      type
    }
  }
`;
export const QUERY_FEATURED_PETS = gql`
  query featuredPets {
    featuredPets {
      _id
      name
      breed
      species
      age
      location
      photo
      featured
      type
    }
  }
`;