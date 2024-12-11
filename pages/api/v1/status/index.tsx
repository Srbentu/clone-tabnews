import type { NextApiRequest, NextApiResponse } from "next";
import database from "../../../../infra/database";

export default async function statusApi(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result);
  response.status(200).json({ status: "ok" });
}
