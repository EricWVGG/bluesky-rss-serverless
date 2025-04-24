import type { RSSItem, PostWithEmbed } from "./types.js"

/* 
Take an RSS Item and transform it into a coherent Bluesky post.

This might involve something like…
  `latest post: ${title}`
… or…
  `${title}\n\n${description.substring(0, MAX_POST_LENGTH - title.length + 2)}`

A bit of editorial license will be necessary.
*/

export const generateMessage = (latest: RSSItem): PostWithEmbed => {
  const { title, description, author } = latest
  const { url, width, height } = latest?.media?.thumbnail

  if (url === undefined) {
    throw new Error("Image not found in feed item.")
  }

  const text = `${title}, by ${author}\n\n${description}`

  return {
    text,
    altText: title,
    imageUrl: url,
    width,
    height,
  }
}
