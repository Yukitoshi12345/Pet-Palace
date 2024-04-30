
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $birthday: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    addUser(name: $name, birthday: $birthday, email: $email, password: $password, confirmPassword: $confirmPassword) {
      token
      user {
        _id
        name
        birthday
        email
      }
    }
  }
`;