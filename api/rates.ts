import { getEnv } from "../src/shared/lib"
import { VercelRequest, VercelResponse } from "@vercel/node"
import fetch from "node-fetch"

const EXCHANGE_RATE_API_KEY = getEnv("EXCHANGE_RATE_API_KEY")
const API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest`

type ExchangeRateApiResponse = {
  result: "success" | "error"
  "error-type": string
  base_code: CurrencyCode
  conversion_rates: { [k in CurrencyCode]: number }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET")

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  const { base } = req.query

  if (!base) {
    return res.status(400).json({ error: `"base" is undefined` })
  }

  try {
    const response = await fetch(`${API_URL}/${base}`)
    const json = (await response.json()) as ExchangeRateApiResponse

    if (json) {
      if (json.result === "success") {
        return res.json(json)
      }

      return res.status(400).json({ error: json["error-type"] })
    } else {
      res.status(500).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
