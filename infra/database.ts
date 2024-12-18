import { Client, QueryResult, QueryConfig } from "pg";

async function query(queryObject: string | QueryConfig): Promise<QueryResult> {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } finally {
    await client.end();
  }
}

export default {
  query
};