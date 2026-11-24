
import mongoose from "mongoose";

export async function connectMongoose(options = {}) {
  const connectionString =
    options.connectionString || process.env.MONGODB_URI;

  const databaseName =
    options.databaseName ||
    process.env.MONGODB_DB_NAME ||
    "practice";

  if (!connectionString) {
    throw new Error("MONGODB_URI is required for Mongoose.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(connectionString, {
    dbName: databaseName,
  });

  console.log("Mongoose connected to MongoDB.");

  return mongoose.connection;
}
