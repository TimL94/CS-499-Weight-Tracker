import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import User from "../models/User.js";
import WeightEntry from "../models/WeightEntry.js";
import Goal from "../models/Goal.js";
import CalorieEntry from "../models/CalorieEntry.js";

import { signToken } from "../utils/auth.js";

// Requires an authenticated user with a MongoDB ID.
const requireUser = (context) => {
  if (
    !context.loggedIn ||
    !mongoose.isObjectIdOrHexString(context.currentUserId)
  ) {
    throw new Error("You must be logged in.");
  }

  return String(context.currentUserId);
};

// Validates a real calendar date in YYYY-MM-DD format.
const validateDate = (date) => {
  if (!date) {
    throw new Error("Date is required.");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Date must use YYYY-MM-DD.");
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error("Enter a valid date.");
  }
};

const resolvers = {
  Query: {
    health: () => {
      return "Weight Tracker API is running";
    },

    getWeightsForUser: async (_, args, context) => {
      const currentUserId = requireUser(context);

      return WeightEntry.find({
        user_id: currentUserId,
      });
    },

    getGoalWeight: async (_, args, context) => {
      const currentUserId = requireUser(context);

      return Goal.findOne({
        user_id: currentUserId,
      });
    },

    getCalorieEntriesForUser: async (_, args, context) => {
      const currentUserId = requireUser(context);

      return CalorieEntry.find({
        user_id: currentUserId,
      });
    },
  },

  Mutation: {
    // Hashes passwords before saving user accounts.
    createUser: async (_, { username, password }) => {
      const trimmedUsername = username.trim().toLowerCase();

      if (!trimmedUsername || !password) {
        throw new Error(
          "Username and password are required."
        );
      }

      // Waits for the unique username index to be ready.
      await User.init();

      const existingUser = await User.findOne({
        username: trimmedUsername,
      });

      if (existingUser) {
        throw new Error("That username already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      let user;

      try {
        user = await User.create({
          username: trimmedUsername,
          password: hashedPassword,
        });
      } catch (error) {
        if (error.code === 11000) {
          throw new Error("That username already exists.");
        }

        throw error;
      }

      const token = signToken(user.id);

      return {
        token,
        currentUserId: user.id,
        loggedIn: true,
      };
    },

    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({
        username: username.trim().toLowerCase(),
      });

      if (!user) {
        throw new Error("Incorrect username or password.");
      }

      const correctPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!correctPassword) {
        throw new Error("Incorrect username or password.");
      }

      const token = signToken(user.id);

      return {
        token,
        currentUserId: user.id,
        loggedIn: true,
      };
    },

    addWeight: async (_, { date, weight }, context) => {
      const currentUserId = requireUser(context);

      validateDate(date);

      if (weight <= 0) {
        throw new Error("Weight must be greater than zero.");
      }

      return WeightEntry.create({
        user_id: currentUserId,
        date,
        weight,
      });
    },

    // Includes ownership in the database filter.
    updateWeight: async (
      _,
      { id, date, weight },
      context
    ) => {
      const currentUserId = requireUser(context);

      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new Error("Weight entry was not found.");
      }

      validateDate(date);

      if (weight <= 0) {
        throw new Error("Weight must be greater than zero.");
      }

      const weightEntry = await WeightEntry.findOneAndUpdate(
        {
          _id: id,
          user_id: currentUserId,
        },
        {
          $set: { date, weight },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!weightEntry) {
        throw new Error("Weight entry was not found.");
      }

      return weightEntry;
    },

    deleteWeight: async (_, { id }, context) => {
      const currentUserId = requireUser(context);

      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new Error("Weight entry was not found.");
      }

      const weightEntry = await WeightEntry.findOneAndDelete({
        _id: id,
        user_id: currentUserId,
      });

      if (!weightEntry) {
        throw new Error("Weight entry was not found.");
      }

      return true;
    },

    // Updates the user's goal or creates their first goal.
    saveGoalWeight: async (
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

      await Goal.init();

      return Goal.findOneAndUpdate(
        {
          user_id: currentUserId,
        },
        {
          $set: { goal_weight },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
    },

    addCalorieEntry: async (
      _,
      { date, calories },
      context
    ) => {
      const currentUserId = requireUser(context);

      validateDate(date);

      if (calories < 0) {
        throw new Error("Calories cannot be negative.");
      }

      return CalorieEntry.create({
        user_id: currentUserId,
        date,
        calories,
      });
    },
  },
};

export default resolvers;