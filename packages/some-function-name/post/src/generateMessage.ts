/* 
Take an RSS Item and transform it into a coherent Bluesky post.

This might involve something like…
  `latest post: ${title}`
… or…
  `${title}\n\n${description.substring(0, MAX_POST_LENGTH - title.length + 2)}`

A bit of editorial license will be necessary.
*/

export interface PostWithEmbed {
  text: string
  altText: string
  imageUrl: string
  width: string
  height: string
}

export interface RSSFeed {
  title: any
  description: any
  link: any
  image: any
  category: any
  items: RSSItem[]
}

export interface RSSItem {
  id: string
  title: string
  description: string
  link: string
  media?: {
    thumbnail?: {
      url: string
      width: string
      height: string
    }
  }
  published: number
  created: number
  category: Array<string>
  author: string
}

export const generateMessage = (data: RSSFeed): PostWithEmbed => {
  const latest = data.items[0]

  const { title, description, author } = latest
  const { url, width, height } = latest?.media?.thumbnail

  if (url === undefined) {
    throw new Error("Image not found in feed item.")
  }

  const text = `${title}, by ${author}\n\n${description}`
  // todo: add permalink? can we “rich text” it?
  // note to self: it does not embed the cartoon, the opengraph description is confusing

  return {
    text,
    altText: title,
    imageUrl: url,
    width,
    height,
  }
}
