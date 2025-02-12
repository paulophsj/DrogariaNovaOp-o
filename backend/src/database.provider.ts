import { createConnection } from 'mysql2/promise';

export const createDatabase = async () => {
  const connection = await createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS drogaria`);
  await connection.end();
};


