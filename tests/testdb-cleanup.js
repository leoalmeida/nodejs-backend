import { MongoClient } from 'mongodb';

const deleteTestDatabases = async () => {
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);

  try {
    await client.connect();
    const databaseNames = await client.db().admin().listDatabases();
    const testDatabaseNames = databaseNames.databases.filter(db => db.name.startsWith('test_'));

    for (const database of testDatabaseNames) {
      await client.db(database.name).dropDatabase();
      console.log(`Deleted database: ${database.name}`);
    }
  } catch (error) {
    console.error('Error deleting test databases:', error);
  } finally {
    await client.close();
  }
};

deleteTestDatabases(); 

package.json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --runInBand --watch ./__tests__ && npm run test:cleanup",
    "test:cleanup": "node ./__tests__/testdb-cleanup.js"
  }
}