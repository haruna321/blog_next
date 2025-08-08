"use client";
import useSWR from 'swr';
import { useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { createAuthenticatedFetcher } from '@/utils/fetcher';
import { TPostsData } from '@/types';

export default function PostsList() {
  const { token, isLoding } = useSupabaseSession();
  const fetcher = useMemo(() => createAuthenticatedFetcher(token), [token]);

  const { data, error, isLoading } = useSWR(
    token ? '/api/admin/posts' : null,
    fetcher
  );

  if (isLoding || isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {String(error)}</p>;

  const posts: TPostsData[] = data?.posts || [];

  return (
    <SPostList>
      {posts.map((post) => (
        <SLink href={`/admin/posts/${post.id}`} key={post.id}>
          <SContentTitle>{post.title}</SContentTitle>
          <SDate>{new Date(post.createdAt).toLocaleDateString()}</SDate>
        </SLink>
      ))}
    </SPostList>
  );
}

const SPostList = styled.div`
margin-top: 50px;
`
const SLink = styled(Link)`
  display: flex; 
  align-items: center; justify-content: space-between;
  border-bottom: 1px solid #333; text-decoration: none;
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
