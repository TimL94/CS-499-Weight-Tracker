import mongoose from "mongoose";

// Defines one goal weight per user.
const goalSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  goal_weight: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => Number.isFinite(value) && value > 0,
      message: "Goal weight must be greater than zero.",
    },
  },
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;