"use client";

import useSWR from 'swr';

export default function PublicPosts() {
  const { data, error, isLoading } = useSWR('/api/posts');

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {String(error)}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}