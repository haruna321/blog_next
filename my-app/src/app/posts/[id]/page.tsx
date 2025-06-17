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
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
      setIsLoading(false);
    };
    fetcher();
  }, [id]);

  if (isLoading) return <p>読み込み中...</p>
  if (!post) return <p className="">記事が見つかりません</p>;

  return (
    <SWrapper>
      <Image className="image" src={post.thumbnailUrl} alt={post.title} width={800} height={400} />
      <SBody>
        <SHead>
          <SDate>{new Date(post.createdAt).toLocaleDateString()}</SDate>
          <SCategories>
            {post.categories.map((category, i) => {
              return (
                <SCategory key={i}>{category}</SCategory>
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


