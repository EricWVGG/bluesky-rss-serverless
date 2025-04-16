import { generateMessage } from "./generateMessage.js"
import { getRSS } from "./getRSS.js"
import { postToAtp } from "./postToAtp.js"

export const main = async () => {
  const data = await getRSS()

  const message = generateMessage(data)

  return postToAtp(message)
}
