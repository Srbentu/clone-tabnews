import { Client, QueryResult, QueryConfig } from "pg";

async function query(queryObject: string | QueryConfig): Promise<QueryResult> {
  let client

  try {
    client = await getNewClient()
    const result = await client.query(queryObject);
    return result;
  } catch(error) {
    console.log(error)
    throw error
  }finally {
    await client?.end();
  }
}

async function getNewClient(){
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });
  await client.connect()
  return client
}

export default {
  query,
  getNewClient
};