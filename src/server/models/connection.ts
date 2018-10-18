import * as pg from 'pg';

// export const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });
export const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'cedarLog'
});
