'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PostForm } from '../_components/PostForm'
import { TCategoryData } from '@/types'
import styled from 'styled-components'

export default function Page() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://placehold.jp/800x400.png',
  ) // 画像URLは、一旦このURL固定でお願いします。後ほど画像アップロード処理を実装します。
  const [categories, setCategories] = useState<TCategoryData[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトの動作をキャンセルします。
    e.preventDefault()

    // 記事を作成します。
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, thumbnailUrl, categories }),
    })

    // レスポンスから作成した記事のIDを取得します。
    const { id } = await res.json()

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
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
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
