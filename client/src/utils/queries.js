import { gql } from "@apollo/client";

// Loads the authenticated user's latest calculator inputs and result.
export const GET_CALORIE_CALCULATION = gql`
  query GetCalorieCalculation {
    getCalorieCalculation {
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

// Fetches the user's weight entries.
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

// Fetches the user's goal weight.
export const GET_GOAL_WEIGHT = gql`
  query GetGoalWeight {
    getGoalWeight {
      id
      user_id
      goal_weight
    }
  }
`;

// Fetches the user's calorie entries.
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