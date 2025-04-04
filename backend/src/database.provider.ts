import { createConnection } from 'mysql2/promise';

export const createDatabase = async () => {
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USERNAME ? process.env.DB_USERNAME : 'root',
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'root',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS drogaria`);
  await connection.end();
};


