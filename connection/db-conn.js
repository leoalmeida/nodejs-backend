import { connect as _connect } from 'mongoose';

async function connectToDatabase(DB_URL = process.env.DATABASE_URL) {
    if (!DB_URL) {
        console.error("Database URL is not defined. Please set the DB_URL environment variable.");
        return;
    }
    try {
        //const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority&appName=ClusterLeo`
        //const url = `mongodb+srv://api-nodejs:8VNergbNwt06HL7R@clusterleo.sckgivp.mongodb.net/db?retryWrites=true&w=majority&appName=ClusterLeo`
        _connect(DB_URL);
        const conn = await _connect(DB_URL);
        console.log('Connected to Database successfully');
        return conn;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Re-throw the error to handle it outside
    } finally {
        console.error("Finally");
    }
}

export  {
  _connect,
  connectToDatabase,
};

