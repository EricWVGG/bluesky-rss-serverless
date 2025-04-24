import { generateMessage } from "./generateMessage.js"
import { getRSS } from "./getRSS.js"
import { postToAtp } from "./postToAtp.js"
import { getLatestBsky } from "./getLatestBsky.js"

export const main = async () => {
  const data = await getRSS()
  const latest = data.items[0]

  const message = generateMessage(data)

  const latestBsky = await getLatestBsky()

  if (latestBsky.post.record.text !== message.text) {
    const response = postToAtp(message)
    return response
  } else {
    return "already posted"
  }
}
