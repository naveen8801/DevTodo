import mongoose from "mongoose";

/**
 * Connects to the Mongo database if not already connected.
 *
 * @return {Promise<void>} A promise that resolves when the database is successfully connected, or rejects with an error if the connection fails.
 */
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection failed");
  }
};

export default connectDB;
