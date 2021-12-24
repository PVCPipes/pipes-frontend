// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: any, res: any) {
  const result = await fetch(`${process.env.BE_API}/v1/hello/getHello`);
  const res_text = await result.json();
  res.status(200).json(res_text);
}
