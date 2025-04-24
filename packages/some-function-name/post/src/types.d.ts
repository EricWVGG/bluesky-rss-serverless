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

export interface PostWithEmbed {
  text: string
  altText: string
  imageUrl: string
  width: string
  height: string
}
