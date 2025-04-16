import "dotenv/config"
import { AtpAgent } from "@atproto/api"
import { blockReplies } from "./blockReplies.js"
import type { PostWithEmbed } from "./generateMessage.js"
import fetch from "node-fetch"

export const postToAtp = async ({ text, altText, imageUrl, width, height }: PostWithEmbed) => {
  const identifier = process.env.BSKY_ID
  const password = process.env.BSKY_PASSWORD
  if (!identifier || !password) {
    throw new Error("Missing AT Protocol credentials. Check environment variables.")
  }
  const service = new URL("https://bsky.social")

  const agent = new AtpAgent({
    service,
  })
  await agent.login({
    identifier,
    password,
  })

  let data: any
  if (!!imageUrl && imageUrl !== "") {
    const imageBuffer = await fetch(imageUrl).then((r) => r.buffer())
    const input = new Uint8Array(imageBuffer as ArrayBuffer)
    const uploadResponse = await agent.uploadBlob(input, { encoding: "image/jpeg" })
    data = uploadResponse.data
  }

  const response = await agent.post({
    text,
    createdAt: new Date().toISOString(),
    embed: !!data
      ? {
          $type: "app.bsky.embed.images",
          images: [
            {
              alt: altText,
              image: data.blob,
              aspectRatio: {
                width: Number(width),
                height: Number(height),
              },
            },
          ],
        }
      : undefined,
  })

  const BLOCK_REPLIES = process.env.BLOCK_REPLIES
  if (BLOCK_REPLIES) {
    await blockReplies(agent, response.uri)
  }

  return response
}
