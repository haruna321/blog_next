"use client";

import { useEffect, useState } from "react";
import { TPostsData } from "@/types";
import Link from 'next/link';
import styled from 'styled-components';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<TPostsData[]>([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
      const data = await res.json();
      setPosts(data.posts);
      setIsLoading(false);
    };
    fetcher();
  }, []);

  if (isLoading) return <p>読み込み中...</p>;
  return (
      <SPostsList>
        {posts.map((item) => {
          return (
            <SPost key={item.id}>
              <Link href={`/posts/${item.id}`}>
              <SHead>
                <SDate>{new Date(item.createdAt).toLocaleDateString()}</SDate>
                <SCategories>
                  {item.categories.map((category) => (
                    <SCategory key={category}>{category}</SCategory>
                  ))}
                </SCategories>
              </SHead>
              <STitle>{item.title}</STitle>
              <SText dangerouslySetInnerHTML={{ __html: item.content.slice(0,60) + `...` }} />
              </Link>
            </SPost>
              )
        })}
      </SPostsList>
    );
  }

  const SPostsList = styled.ul`
    margin: 5rem auto;
    list-style: none;
    max-width: 1000px;
  `

  const SPost = styled.li`
    border: 1px solid #dcdcdc;
    margin-bottom: 3rem;
    padding: 1.5rem 3rem 1.5rem 1.5rem;
    
    a{
      color: #333;
      text-decoration: none;
    }

    &:last-child {
      margin-bottom: 0;
    }
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

