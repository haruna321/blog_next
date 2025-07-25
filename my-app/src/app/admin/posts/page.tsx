"use client"

import { TPostsData } from "@/types"
import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Page(){
  const [posts , setPosts] = useState<TPostsData[]>([])

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/posts')
      const { posts } = await res.json()
      setPosts(posts)
    }
    fetcher()
  }, [])
  return (
    <SWrapper>
      <SHead>
        <STitle>記事一覧</STitle>
        <SButton href="/admin/posts/new">新規作成</SButton>
      </SHead>
      <SPostList>
        {posts.map((post) => {
          return (
            <SLink href={`/admin/posts/${post.id}`} key={post.id}>
              <SContentTitle>{post.title}</SContentTitle>
              <SDate>{new Date(post.createdAt).toLocaleDateString()}</SDate>
            </SLink>
          )
        })}
      </SPostList>
    </SWrapper>
  )
}

const SWrapper = styled.main`
  padding: 30px 20px;
`
const SHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SButton = styled(Link)`
  border-radius: 7px;
  background-color: #3184ff;
  color: #fff;
  font-size: 16px;
  width: 180px;
  text-align: center;
  padding: 10px;
  display: block;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  &:hover{
    transition: background 0.2s;
    background-color: #333;
  }
`
const STitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`

const SPostList = styled.div`
  margin-top: 50px;
`

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  text-decoration: none;
`
const SContentTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`

const SDate = styled.p`
  font-size: 12px;
  color: #656565;
`

