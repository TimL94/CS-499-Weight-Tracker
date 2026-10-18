import { gql } from "@apollo/client";

// Calculates and saves the latest result for the authenticated user.
export const SAVE_CALORIE_CALCULATION = gql`
  mutation SaveCalorieCalculation(
    $age: Int!
    $gender: String!
    $feet: Int!
    $inches: Float!
    $weight: Float!
  ) {
    saveCalorieCalculation(
      age: $age
      gender: $gender
      feet: $feet
      inches: $inches
      weight: $weight
    ) {
      id
      user_id
      age
      gender
      feet
      inches
      weight
      restingCalories
      recommendedCalories
      activityMultiplier
    }
  }
`;

// Creates a user account.
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

// Logs in a user.
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

// Adds a weight entry.
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

// Updates a weight entry.
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

// Deletes a weight entry.
export const DELETE_WEIGHT = gql`
  mutation DeleteWeight($id: ID!) {
    deleteWeight(id: $id)
  }
`;

// Saves the user's goal weight.
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

// Adds a calorie entry.
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