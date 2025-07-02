const mongoose = require('mongoose');
const { connectToDatabase } = require('../connection/db-conn');
const { redis_client } = require('../connection/redis-conn');
const { v4: uuidv4 } = require('uuid');

const setup = () => {
  beforeEach(async () => {
    await connectToDatabase(`mongodb://127.0.0.1:27017/test_${uuidv4()}`);
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await redis_client.flushDb();s
  });
};

module.exports = { setup };