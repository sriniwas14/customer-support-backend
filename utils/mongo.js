const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB;

let mongoInstance;

async function startMongo() {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    mongoInstance = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

module.exports = {
  mongoInstance,
  startMongo,
};

