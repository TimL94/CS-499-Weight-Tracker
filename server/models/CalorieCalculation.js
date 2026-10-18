import mongoose from "mongoose";

// Stores the latest calculator inputs and result for each account.
const calorieCalculationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  age: {
    type: Number,
    required: true,
    min: 18,
    max: 120,
    validate: Number.isInteger,
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },

  feet: {
    type: Number,
    required: true,
    min: 0,
    validate: Number.isInteger,
  },

  inches: {
    type: Number,
    required: true,
    min: 0,
    validate: (value) => Number.isFinite(value) && value < 12,
  },

  weight: {
    type: Number,
    required: true,
    validate: (value) => Number.isFinite(value) && value > 0,
  },

  restingCalories: {
    type: Number,
    required: true,
    min: 0,
  },

  recommendedCalories: {
    type: Number,
    required: true,
    min: 0,
  },

  activityMultiplier: {
    type: Number,
    required: true,
  },
});

const CalorieCalculation = mongoose.model(
  "CalorieCalculation",
  calorieCalculationSchema
);

export default CalorieCalculation;