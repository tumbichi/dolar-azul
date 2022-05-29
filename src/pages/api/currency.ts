// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fetch("https://api.bluelytics.com.ar/v2/latest")
    .then((response) => response.json())
    .then((data) => res.status(200).json(data));
}
