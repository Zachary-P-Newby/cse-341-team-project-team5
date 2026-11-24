import { MongoClient } from 'mongodb';

import mongoose from "mongoose";

let database;
let client;

const connectToDb = async (options = {}) => {
  if (database) {
    return database;
  }

  const connectionString = options.connectionString || process.env.MONGODB_URI;
  const databaseName = options.databaseName || process.env.MONGODB_DB_NAME || 'practice';

  if (!connectionString) {
    throw new Error('MONGODB_URI is required.');
  }

  client = new MongoClient(connectionString);
  await client.connect();
  database = client.db(databaseName);
  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized. Call connectToDb first.');
  }
  return database;
};

const closeDb = async () => {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
  }
};


//Mongoose connection created by Duck.ai and Modified by Zachary-P-Newby


let connectionPromise;

const connectToMongoose = async (options = {}) => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.db;
  }

  const connectionString =
    options.connectionString || process.env.MONGODB_URI;
  const databaseName =
    options.databaseName || process.env.MONGODB_DB_NAME || "practice";

  if (!connectionString) {
    throw new Error("MONGODB_URI is required.");
  }

  // Reuse an in-progress connection attempt if another caller started one.
  if (!connectionPromise) {
    
    try{
      //Create connection supplying connection string and database name
      connectionPromise = await mongoose.connect(connectionString, {dbName: databaseName});
      
    }catch(error){
      console.error("Data base connection error: ", error)
    }


  }

  return connectionPromise;
};



export { closeDb, connectToDb, getDb, connectToMongoose };
