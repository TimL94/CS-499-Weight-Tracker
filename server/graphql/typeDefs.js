// GraphQL type definitions for users, weights, goals, calorie entries,
// and saved calorie calculations.
const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
  }

  type Weight {
    id: ID!
    user_id: ID!
    date: String!
    weight: Float!
  }

  type Goal {
    id: ID!
    user_id: ID!
    goal_weight: Float!
  }

  type CalorieEntry {
    id: ID!
    user_id: ID!
    date: String!
    calories: Int!
  }

  type Auth {
    token: String!
    currentUserId: ID!
    loggedIn: Boolean!
  }

  type CalorieCalculation {
    id: ID!
    user_id: ID!
    age: Int!
    gender: String!
    feet: Int!
    inches: Float!
    weight: Float!
    restingCalories: Float!
    recommendedCalories: Float!
    activityMultiplier: Float!
  }

  type Query {
    health: String!
    getWeightsForUser: [Weight!]!
    getGoalWeight: Goal
    getCalorieEntriesForUser: [CalorieEntry!]!
    getCalorieCalculation: CalorieCalculation
  }

  type Mutation {
    saveCalorieCalculation(
      age: Int!
      gender: String!
      feet: Int!
      inches: Float!
      weight: Float!
    ): CalorieCalculation!

    createUser(
      username: String!
      password: String!
    ): Auth!

    loginUser(
      username: String!
      password: String!
    ): Auth!

    addWeight(
      date: String!
      weight: Float!
    ): Weight!

    updateWeight(
      id: ID!
      date: String!
      weight: Float!
    ): Weight!

    deleteWeight(
      id: ID!
    ): Boolean!

    saveGoalWeight(
      goal_weight: Float!
    ): Goal!

    addCalorieEntry(
      date: String!
      calories: Int!
    ): CalorieEntry!
  }
`;

export default typeDefs;