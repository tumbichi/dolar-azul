// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fetch(String(process.env.API_URL))
    .then((response) => response.json())
    .then((data) => res.status(200).json(data));
}
