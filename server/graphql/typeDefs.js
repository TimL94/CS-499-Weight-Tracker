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

  type Query {
    health: String!
    getWeightsForUser: [Weight!]!
    getGoalWeight: Goal
    getCalorieEntriesForUser: [CalorieEntry!]!
  }

  type Mutation {
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
    ): Weight!

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