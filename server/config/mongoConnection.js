require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI;

const client = new MongoClient(url);

const dbName = "FitNow";
let database;

async function mongoConnect() {
  try {
    await client.connect();

    console.log("connected succesfully to MongoDB Server");

    database = client.db(dbName);

    return database;
  } catch (error) {
    console.log(error);
  }
}

function getDatabase() {
  return database;
}

module.exports = { mongoConnect, getDatabase };
