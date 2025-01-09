import type { NextApiRequest, NextApiResponse } from "next";
import migrationRunner from 'node-pg-migrate';
import { join } from "node:path";
import database  from "infra/database"

type MigrationDirection = 'up' | 'down';

export default async function migrationsApi(
  request: NextApiRequest,
  response: NextApiResponse
) {

  const dbClient = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up" as MigrationDirection,
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  try {
    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });
      const status = migratedMigrations.length > 0 ? 201 : 200;
      return response.status(status).json(migratedMigrations);
    }

    return response.status(405).end();
  } catch (error) {
    console.error("Erro ao executar migrações:", error);
    return response.status(500).json({ error: "Erro ao executar migrações" });
  } finally {
    await dbClient.end();
  }
}
