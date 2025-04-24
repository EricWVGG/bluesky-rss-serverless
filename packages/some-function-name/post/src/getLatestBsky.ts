import "dotenv/config"
import { AtpAgent, AppBskyFeedDefs } from "@atproto/api"

export const getLatestBsky = async (): Promise<AppBskyFeedDefs.FeedViewPost> => {
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

  const latest = await agent.getAuthorFeed({
    actor: identifier,
    limit: 1,
    filter: "posts_with_media",
    includePins: false,
  })

  return latest.data.feed[0]
}
