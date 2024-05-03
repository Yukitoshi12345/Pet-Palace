import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query User($userEmail: String!) {
    user(userEmail: $userEmail) {
      _id
      name
      birthday
      favoritePet
      email  
    }
  }
`;