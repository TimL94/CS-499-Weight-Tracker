import { gql } from "@apollo/client";

// GraphQL mutations for user authentication, weight management, and goal weight management.
export const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
  ) {
    createUser(
      username: $username
      password: $password
    ) {
      token
      currentUserId
      loggedIn
    }
  }
`;

// GraphQL mutation for logging in a user.
export const LOGIN_USER = gql`
  mutation LoginUser(
    $username: String!
    $password: String!
  ) {
    loginUser(
      username: $username
      password: $password
    ) {
      token
      currentUserId
      loggedIn
    }
  }
`;

// GraphQL mutation for adding a weight entry.
export const ADD_WEIGHT = gql`
  mutation AddWeight(
    $date: String!
    $weight: Float!
  ) {
    addWeight(
      date: $date
      weight: $weight
    ) {
      id
      user_id
      date
      weight
    }
  }
`;

// GraphQL mutation for updating a weight entry.
export const UPDATE_WEIGHT = gql`
  mutation UpdateWeight(
    $id: ID!
    $date: String!
    $weight: Float!
  ) {
    updateWeight(
      id: $id
      date: $date
      weight: $weight
    ) {
      id
      user_id
      date
      weight
    }
  }
`;

// GraphQL mutation for deleting a weight entry.
export const DELETE_WEIGHT = gql`
  mutation DeleteWeight($id: ID!) {
    deleteWeight(id: $id)
  }
`;

// GraphQL mutation for saving the user's goal weight.
export const SAVE_GOAL_WEIGHT = gql`
  mutation SaveGoalWeight(
    $goal_weight: Float!
  ) {
    saveGoalWeight(
      goal_weight: $goal_weight
    ) {
      id
      user_id
      goal_weight
    }
  }
`;

// GraphQL mutation for adding a calorie entry.
export const ADD_CALORIE_ENTRY = gql`
  mutation AddCalorieEntry(
    $date: String!
    $calories: Int!
  ) {
    addCalorieEntry(
      date: $date
      calories: $calories
    ) {
      id
      user_id
      date
      calories
    }
  }
`;