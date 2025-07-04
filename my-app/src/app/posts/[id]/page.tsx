"use client";

import { TPostParams, TPostsData } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from 'styled-components';

const PostDetail = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<TPostsData | null>(null);
  const { id } = useParams<TPostParams>();

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true)
      const res = await fetch(`https://nlzn4vo9ns.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string // APIキーをセット
          },
        },
      )
      const data = await res.json()
      setPost(data) 
      setIsLoading(false)
    }

    fetcher()
  }, [id])

  if (isLoading) return <p>読み込み中...</p>
  if (!post) return <p className="">記事が見つかりません</p>;

  return (
    <SWrapper>
      <Image className="image" src={post.thumbnail.url} alt={post.title} width={post.thumbnail.width} height={post.thumbnail.height} />
      <SBody>
        <SHead>
          <SDate>{new Date(post.createdAt).toLocaleDateString()}</SDate>
          <SCategories>
            {post.categories?.map((category) => {
              return (
                <SCategory key={category.id}>{category.name}</SCategory>
              )
            })}
          </SCategories>
        </SHead>
        <STitle>{post.title}</STitle>
        <SText dangerouslySetInnerHTML={{ __html: post.content}} />
      </SBody>
    </SWrapper>
  )
}

export default PostDetail;

const SWrapper = styled.section`
  max-width: 800px;
  width: 100%;
  margin: 50px auto;
`
const SBody = styled.div`
  padding: 10px;
`
const SHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SDate = styled.time`
  font-size: 1.2rem;
`
const SCategories = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
`
const SCategory = styled.li`
  border: 1px solid rgb(22, 99, 223);
  color: rgb(22, 99, 223);
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 0.3rem;
`
const STitle = styled.p`
  font-size: 2.4rem;
  margin-top: 1rem;
`
const SText = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
  margin-top: 1.5rem;
`


