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