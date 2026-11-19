//New connection method provided bu Duck.ai as the orginal does not use Mongoose, 
//Modified by Zachary-P-Newby

import mongoose from "mongoose";

let connectionPromise;

const connectToDb = async (options = {}) => {
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

const getDb = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not initialized. Call connectToDb first.");
  }

  return mongoose.connection.db;
};

const closeDb = async () => {
  connectionPromise = undefined;

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

export { closeDb, connectToDb, getDb };



/*

import { MongoClient } from 'mongodb';

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

export { closeDb, connectToDb, getDb };


*/