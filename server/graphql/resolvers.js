import bcrypt from "bcryptjs";

import {
  users,
  weights,
  goals,
  calorieEntries,
  getNextUserId,
  getNextWeightId,
  getNextGoalId,
  getNextCalorieEntryId,
} from "../data/temporaryData.js";

import { signToken } from "../utils/auth.js";

// Helper function to ensure that a user is logged in before performing certain actions.
const requireUser = (context) => {
  if (!context.loggedIn || !context.currentUserId) {
    throw new Error("You must be logged in.");
  }

  return Number(context.currentUserId);
};

// GraphQL resolvers for handling queries and mutations related to users, weights, goals, and calorie entries.
const resolvers = {
  Query: {
    // Simple health check query to verify that the API is running.
    health: () => {
      return "Weight Tracker API is running";
    },

    // Fetches the weights for the currently logged-in user, ensuring that the user is authenticated.
    getWeightsForUser: (_, args, context) => {
      const currentUserId = requireUser(context);

      return weights.filter(
        (weightEntry) =>
          weightEntry.user_id === currentUserId
      );
    },

    // Fetches the goal weight for the currently logged-in user, ensuring that the user is authenticated.
    getGoalWeight: (_, args, context) => {
      const currentUserId = requireUser(context);

      return (
        goals.find(
          (goal) =>
            goal.user_id === currentUserId
        ) || null
      );
    },

    // Fetches the calorie entries for the currently logged-in user, ensuring that the user is authenticated.
    getCalorieEntriesForUser: (_, args, context) => {
      const currentUserId = requireUser(context);

      return calorieEntries.filter(
        (calorieEntry) =>
          calorieEntry.user_id === currentUserId
      );
    },
  },


  // GraphQL mutations for creating users, logging in, and managing weights, goals, and calorie entries.
  Mutation: {

    // Creates a new user with a unique username and securely hashed password, returning an authentication token upon success.
    createUser: async (_, { username, password }) => {
      const trimmedUsername = username.trim();

      if (!trimmedUsername || !password) {
        throw new Error(
          "Username and password are required."
        );
      }

      const existingUser = users.find(
        (user) =>
          user.username.toLowerCase() ===
          trimmedUsername.toLowerCase()
      );

      if (existingUser) {
        throw new Error(
          "That username already exists."
        );
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const user = {
        id: getNextUserId(),
        username: trimmedUsername,

        // Same password concept as Android,
        // but the value is now securely hashed.
        password: hashedPassword,
      };

      users.push(user);

      const token = signToken(user.id);

      return {
        token,
        currentUserId: user.id,
        loggedIn: true,
      };
    },

    // Logs in an existing user by verifying the provided username and password, returning an authentication token upon success.
    loginUser: async (_, { username, password }) => {
      const user = users.find(
        (user) =>
          user.username.toLowerCase() ===
          username.trim().toLowerCase()
      );

      if (!user) {
        throw new Error(
          "Incorrect username or password."
        );
      }

      const correctPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!correctPassword) {
        throw new Error(
          "Incorrect username or password."
        );
      }

      const token = signToken(user.id);

      return {
        token,
        currentUserId: user.id,
        loggedIn: true,
      };
    },

    // Adds a new weight entry for the currently logged-in user, ensuring that the user is authenticated.
    addWeight: (_, { date, weight }, context) => {
      const currentUserId = requireUser(context);

      if (!date) {
        throw new Error("Date is required.");
      }

      if (weight <= 0) {
        throw new Error(
          "Weight must be greater than zero."
        );
      }

      const weightEntry = {
        id: getNextWeightId(),
        user_id: currentUserId,
        date,
        weight,
      };

      weights.push(weightEntry);

      return weightEntry;
    },

    // Updates an existing weight entry for the currently logged-in user, ensuring that the user is authenticated and that the entry exists.
    updateWeight: (
      _,
      { id, date, weight },
      context
    ) => {
      const currentUserId = requireUser(context);

      const editingWeightId = Number(id);

      const weightEntry = weights.find(
        (weightEntry) =>
          weightEntry.id === editingWeightId &&
          weightEntry.user_id === currentUserId
      );

      if (!weightEntry) {
        throw new Error(
          "Weight entry was not found."
        );
      }

      if (!date) {
        throw new Error("Date is required.");
      }

      if (weight <= 0) {
        throw new Error(
          "Weight must be greater than zero."
        );
      }

      weightEntry.date = date;
      weightEntry.weight = weight;

      return weightEntry;
    },

    // Deletes an existing weight entry for the currently logged-in user, ensuring that the user is authenticated and that the entry exists.
    deleteWeight: (_, { id }, context) => {
      const currentUserId = requireUser(context);

      const editingWeightId = Number(id);

      const weightIndex = weights.findIndex(
        (weightEntry) =>
          weightEntry.id === editingWeightId &&
          weightEntry.user_id === currentUserId
      );

      if (weightIndex === -1) {
        throw new Error(
          "Weight entry was not found."
        );
      }

      weights.splice(weightIndex, 1);

      return true;
    },

    // Saves the goal weight for the currently logged-in user, ensuring that the user is authenticated.
    saveGoalWeight: (
      _,
      { goal_weight },
      context
    ) => {
      const currentUserId = requireUser(context);

      if (goal_weight <= 0) {
        throw new Error(
          "Goal weight must be greater than zero."
        );
      }

      let goal = goals.find(
        (goal) =>
          goal.user_id === currentUserId
      );

      if (goal) {
        goal.goal_weight = goal_weight;
        return goal;
      }

      goal = {
        id: getNextGoalId(),
        user_id: currentUserId,
        goal_weight,
      };

      goals.push(goal);

      return goal;
    },

    // Adds a new calorie entry for the currently logged-in user, ensuring that the user is authenticated.
    addCalorieEntry: (
      _,
      { date, calories },
      context
    ) => {
      const currentUserId = requireUser(context);

      if (!date) {
        throw new Error("Date is required.");
      }

      if (calories < 0) {
        throw new Error(
          "Calories cannot be negative."
        );
      }

      const calorieEntry = {
        id: getNextCalorieEntryId(),
        user_id: currentUserId,
        date,
        calories,
      };

      calorieEntries.push(calorieEntry);

      return calorieEntry;
    },
  },
};

export default resolvers;