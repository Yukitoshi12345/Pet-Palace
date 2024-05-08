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
  mutation addUser(
    $name: String!
    $birthday: String!
    $favoritePet: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      name: $name
      birthday: $birthday
      favoritePet: $favoritePet
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        name
        birthday
        favoritePet
        email
      }
    }
  }
`;

export const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($amount: Int!, $message: String) {
    createCheckoutSession(amount: $amount, message: $message) {
      session
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword, confirmPassword: $confirmPassword)
  }
`;

