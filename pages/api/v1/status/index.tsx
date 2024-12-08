import type { NextApiRequest, NextApiResponse } from "next";

export default function statusApi(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.status(200).json({ status: "ok" });
}
