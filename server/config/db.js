import mongoose from "mongoose";

// Connects to the database specified in server/.env.
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is missing from server/.env."
    );
  }

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB connected.");
};

export default connectDB;