import type { NextApiRequest, NextApiResponse } from "next";
import migrationRunner from 'node-pg-migrate';
import { join } from "node:path";

type MigrationDirection = 'up' | 'down';

export default async function migrationsApi(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    return response.status(500).json({ error: "DATABASE_URL não está definida" });
  }
  const defaultMigrationsOptions = {
    databaseUrl,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up" as MigrationDirection,
    verbose: true,
    migrationsTable:"pgmigrations"
  }
  if(request.method === "GET"){
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
  
    response.status(200).json(pendingMigrations);
  }
  if(request.method === "POST"){
    const migratedMigrations= await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    if(migratedMigrations.length > 0){
      response.status(201).json(migratedMigrations);
    }
  
    response.status(200).json(migratedMigrations);
  }
  return response.status(405).end()
}