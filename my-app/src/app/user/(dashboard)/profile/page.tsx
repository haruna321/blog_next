"use client";

import { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useFetch } from "@/app/_hooks/useFetch";
import { TPostsData } from "@/types";

type LikesRes = { likes: { post: TPostsData }[] }
type FavRes   = { favorites: { post: TPostsData }[] }
type ComRes   = { comments: { id: number; content: string; post: TPostsData }[] }

export default function Page() {
  const { session, isLoding, token } = useSupabaseSession();

  useEffect(() => {
    if (token) {
      document.cookie = `sb-access-token=${token}; Max-Age=604800; Path=/; SameSite=Lax`
    }
  }, [token]);

  const { data: likesData, isLoading: likesLoading, error: likesError } = useFetch<LikesRes>("/user/likes");
  const { data: favData, isLoading: favLoading, error: favError } = useFetch<FavRes>("/user/favorites");
  const { data: comData, isLoading: comLoading, error: comError } = useFetch<ComRes>("/user/comments");

  if (isLoding) return <p>読み込み中...</p>;

  const likedPosts: TPostsData[] =
    ((likesData as LikesRes | undefined)?.likes ?? []).map(l => l.post)

  const favoritePosts: TPostsData[] =
    ((favData as FavRes | undefined)?.favorites ?? []).map(f => f.post)

  const commented =
    ((comData as ComRes | undefined)?.comments ?? [])

  return (
    <SWrapper>
      <STitle>プロフィール</STitle>
      <SItem><SLabel>ユーザーID</SLabel><SValue>{session?.user?.id}</SValue></SItem>
      <SItem><SLabel>メールアドレス</SLabel><SValue>{session?.user?.email ?? "-"}</SValue></SItem>

      <SSection>
        <SSectionTitle>いいねした記事</SSectionTitle>
        {likesLoading ? <p>読み込み中...</p> : likesError ? <p>エラー: {String(likesError)}</p> :
          likedPosts.length === 0 ? <p>まだありません</p> :
          <SList>{likedPosts.map((p) => (<li key={p.id}><Link href={`/posts/${p.id}`}>{p.title}</Link></li>))}</SList>}
      </SSection>

      <SSection>
        <SSectionTitle>コメントした記事</SSectionTitle>
        {comLoading ? <p>読み込み中...</p> : comError ? <p>エラー: {String(comError)}</p> :
          commented.length === 0 ? <p>まだありません</p> :
          <SList>{commented.map((c) => (
            <li key={c.id}><Link href={`/posts/${c.post.id}`}>{c.post.title}</Link><SComment>「{c.content}」</SComment></li>
          ))}</SList>}
      </SSection>

      <SSection>
        <SSectionTitle>お気に入り登録した記事</SSectionTitle>
        {favLoading ? <p>読み込み中...</p> : favError ? <p>エラー: {String(favError)}</p> :
          favoritePosts.length === 0 ? <p>まだありません</p> :
          <SList>{favoritePosts.map((p) => (<li key={p.id}><Link href={`/posts/${p.id}`}>{p.title}</Link></li>))}</SList>}
      </SSection>
    </SWrapper>
  );
}

const SWrapper = styled.main`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 16px;
`
const STitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`
const SItem = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
`
const SLabel = styled.p`
  color: #666;
  font-size: 12px;
`
const SValue = styled.p`
  color: #222;
  font-weight: bold;
`
const SSection = styled.section`
  margin-top: 24px;
`
const SSectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`
const SList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: grid;
  gap: 8px;
`
const SComment = styled.p`
  color: #666;
  font-size: 12px;
`