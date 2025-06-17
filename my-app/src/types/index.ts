export type TPostsData = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
}

export type TPostParams = {
  id: string;
}