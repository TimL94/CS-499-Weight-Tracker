import { gql } from "@apollo/client";

// GraphQL queries for fetching user weights, goal weight, and calorie entries.
export const GET_WEIGHTS_FOR_USER = gql`
  query GetWeightsForUser {
    getWeightsForUser {
      id
      user_id
      date
      weight
    }
  }
`;

// GraphQL query for fetching the user's goal weight.
export const GET_GOAL_WEIGHT = gql`
  query GetGoalWeight {
    getGoalWeight {
      id
      user_id
      goal_weight
    }
  }
`;

// GraphQL query for fetching the user's calorie entries.
export const GET_CALORIE_ENTRIES_FOR_USER = gql`
  query GetCalorieEntriesForUser {
    getCalorieEntriesForUser {
      id
      user_id
      date
      calories
    }
  }
`;