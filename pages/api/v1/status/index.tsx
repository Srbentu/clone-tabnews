import type { NextApiRequest, NextApiResponse } from "next";
import database from "infra/database";

export default async function statusApi(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const updatedAt = new Date().toISOString()
  response.status(200).json({ 
    updated_at: updatedAt,
    postgress_version: 200,
    maxmimum_conections:3,
    used_conections:2,
   });
}
