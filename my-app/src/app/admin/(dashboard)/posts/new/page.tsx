'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PostForm } from '../_components/PostForm'
import { TCategoryData } from '@/types'
import styled from 'styled-components'
import { mutate } from 'swr'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'

export default function Page() {
  const [thumbnailImageKey, setThumbnailImageKey] = useState('')
  const [categories, setCategories] = useState<TCategoryData[]>([])
  const router = useRouter()
  const { token } = useSupabaseSession()

  const onSubmit = async ({ title, content }: { title: string; content: string }) => {
    if (!token) return  // トークン未取得時は中断

    // 記事を作成します。
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,  // tokenは上で絞り込んでstringとして扱える
      },
      body: JSON.stringify({ title, content, thumbnailImageKey, categories }),
    })

    // レスポンスから作成した記事のIDを取得します。
    const { id } = await res.json()

    await mutate('/api/admin/posts')  // 一覧再検証
    // 作成した記事の詳細ページに遷移します。
    router.push(`/admin/posts/${id}`)
    alert('記事を作成しました。')
  }

  return (
    <SWrapper>
      <SHead>
        <STitle>記事作成</STitle>
      </SHead>
      <PostForm
        mode="new"
        defaultValues={{ title: '', content: '' }}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        categories={categories}
        setCategories={setCategories}
        onSubmit={onSubmit}
      />
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

const STitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`