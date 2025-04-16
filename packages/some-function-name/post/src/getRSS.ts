import "dotenv/config"
import rssToJson from "rss-to-json"
import { sleep } from "./sleep.js"

const { parse } = rssToJson

const RSS_URL = process.env.RSS_URL
const MAX_ATTEMPTS = process.env.MAX_ATTEMPTS || 3
const PAUSE_BETWEEN_ATTEMPTS = process.env.PAUSE_BETWEEN_ATTEMPTS || 3000
// ^ three seconds (note: serverless functions cost money!)

export const getRSS = async (attemptsLeft = Number(MAX_ATTEMPTS)) => {
  if (RSS_URL === undefined || RSS_URL === "") {
    throw new Error("Required env var RSS_URL not found.")
  }

  try {
    const data = await parse(RSS_URL)
    return data
  } catch (error) {
    if (attemptsLeft <= 1) {
      throw new Error(`Failed to retrieve data after ${Number(MAX_ATTEMPTS)} retries.`, { cause: error })
    }
    await sleep(Number(PAUSE_BETWEEN_ATTEMPTS))
    getRSS(attemptsLeft - 1)
  }
}
