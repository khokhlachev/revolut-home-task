import { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST")

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  setTimeout(() => res.json(req.body), 1000)
}
