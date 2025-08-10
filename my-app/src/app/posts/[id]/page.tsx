"use client";

import { Header } from "@/app/_components/Header";
import { TPostParams, TPostsData } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
import styled from 'styled-components';
import { supabase } from "@/utils/supabase";
import useSWR from "swr";

const PostDetail = () => {

  const { id } = useParams<TPostParams>();
  const { data, error, isLoading } = useSWR(
    id ? `/api/posts/${id}` : null
  );

  const post: TPostsData | null = data?.post || null;

  const { data: thumbnailImageUrl } = useSWR(
    post?.thumbnailImageKey ? ['post-thumbnail-url', post.thumbnailImageKey] : null,
    async ([, key]) => {
      const { data: { publicUrl } } = await supabase.storage
        .from("post-thumbnail")
        .getPublicUrl(key);
      return publicUrl;
    }
  );

  if (isLoading) 
    return <p>読み込み中...</p>;
  if (error) 
    return <p>エラー: {String(error)}</p>;
  if (!post) 
    return <p>記事が見つかりません</p>;

  return (
    <>
      <Header />
      <SWrapper>
        {thumbnailImageUrl && (
          <SImage src={thumbnailImageUrl} alt="thumbnail" width={800} height={800} />
        )}
        <SBody>
          <SHead>
            <SDate>{new Date(post.createdAt).toLocaleDateString()}</SDate>
            <SCategories>
              {post.postCategories?.map((pc) => {
                return (
                  <SCategory key={pc.category.id}>{pc.category.name}</SCategory>
                )
              })}
            </SCategories>
          </SHead>
          <STitle>{post.title}</STitle>
          <SText dangerouslySetInnerHTML={{ __html: post.content}} />
        </SBody>
      </SWrapper>
    </>
  )
}

export default PostDetail;

const SWrapper = styled.section`
  max-width: 800px;
  width: 100%;
  margin: 50px auto;
`
const SImage = styled(Image)`
  object-fit: cover;
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


