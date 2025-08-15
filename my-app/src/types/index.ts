export type TPostsData = {
  id: number
  title: string
  content: string
  createdAt: string
  thumbnailImageKey: string
  setThumbnailImageKey: (thumbnailImageKey: string) => void
  postCategories: { category: TCategoryData }[]
}

export type TPostParams = {
  id: string;
}

export type TCategoryData = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}