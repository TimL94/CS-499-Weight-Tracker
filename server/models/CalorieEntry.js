import mongoose from "mongoose";

// Defines calorie entries belonging to a user.
const calorieEntrySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  date: {
    type: String,
    required: true,
  },

  calories: {
    type: Number,
    required: true,
    min: [0, "Calories cannot be negative."],
    validate: {
      validator: (value) => Number.isInteger(value),
      message: "Calories must be a whole number.",
    },
  },
});

const CalorieEntry = mongoose.model(
  "CalorieEntry",
  calorieEntrySchema
);

export default CalorieEntry;