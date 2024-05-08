import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      name
      birthday
      favoritePet
      email
      favorites {
        _id
        name 
        photo
        type
      }
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
      favorites {
        _id
        name
        photo 
        type
      }
    }
  }
`;

export const QUERY_ALL_PETS = gql`
  query allPets {
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

export const QUERY_PETS = gql`
  query pets($petsLimit: Int!, $cursor: String) {
    pets(first: $petsLimit, after: $cursor) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
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
    }
  }
`;

export const QUERY_SINGLE_PET = gql`
  query singlePet($petId: ID!) {
    pet(petId: $petId) {
      _id
      name
      breed
      species
      age
      gender
      color
      description
      location
      photo
      featured
      type
      health
      tame
      specialNeeds
      vaccinationHistory
      disability
      pedigreeKnown
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

export const QUERY_PET_TYPES = gql`
  query petTypes {
    petTypes
  }
`;

export const QUERY_LOCATIONS = gql`
  query locations {
    locations
  }
`;

// export const QUERY_BREEDS = gql`
//   query breeds($petType: String!) {
//     breeds(petType: $petType)
//   }
// `;

// export const QUERY_SPECIES = gql`
//   query species($petType: String!) {
//     species(petType: $petType)
//   }
// `;

export const QUERY_PETS_BY_LOCATION = gql`
  query petsByLocation($location: String!) {
    petsByLocation(location: $location) {
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

export const USER_DONATIONS = gql`
  query Query {
    me {
      donations {
        donationAmount
        donationDate
      }
    }
  }
`;
