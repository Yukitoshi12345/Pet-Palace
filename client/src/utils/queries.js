import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      name
      birthday
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