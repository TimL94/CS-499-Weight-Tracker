import mongoose from "mongoose";

// Defines weight entries belonging to a user.
const weightEntrySchema = new mongoose.Schema({
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

  weight: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => Number.isFinite(value) && value > 0,
      message: "Weight must be greater than zero.",
    },
  },
});

const WeightEntry = mongoose.model(
  "WeightEntry",
  weightEntrySchema
);

export default WeightEntry;