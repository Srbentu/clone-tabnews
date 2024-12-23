import type { NextApiRequest, NextApiResponse } from "next";
import migrationRunner from 'node-pg-migrate';
import { join } from "node:path";

export default async function migrationsApi(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    return response.status(500).json({ error: "DATABASE_URL não está definida" });
  }
  console.log(request.method)
  if(request.method === "GET"){
    const migrations = await migrationRunner({
      databaseUrl,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable:"pgmigrations"
    });
  
    response.status(200).json(migrations);
  }
  if(request.method === "POST"){
    const migrations = await migrationRunner({
      databaseUrl,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable:"pgmigrations"
    });
  
    response.status(200).json(migrations);
  }
  return response.status(405).end()
}