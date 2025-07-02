import { app } from './app.js';
import { connectToDatabase } from './connection/db-conn.js';
import dotenv from 'dotenv';
dotenv.config();

connectToDatabase(app.get('db_url'));

const port = app.get('port') || process.env.PORT || 8080;

let appServer = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  appServer.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  appServer.close(() => {
    console.log('Process terminated!');
  });
});