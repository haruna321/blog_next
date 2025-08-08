"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PostForm } from '../_components/PostForm'
import { TCategoryData, TPostsData } from '@/types'
import styled from 'styled-components'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'
import { mutate } from 'swr'


export default function Page() {
  const [formDefaults, setFormDefaults] = useState({ title: '', content: '' })
  const [thumbnailImageKey, setThumbnailImageKey] = useState('')
  const [categories, setCategories] = useState<TCategoryData[]>([])
  const { id } = useParams()
  const router = useRouter()
  const { token, isLoding } = useSupabaseSession()

  const onSubmit = async ({ title, content }: { title: string; content: string }) => {
    if (!token) return

    await fetch(`/api/admin/posts/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ title, content, thumbnailImageKey, categories }),
    })

    await mutate('/api/admin/posts')
    alert('記事を更新しました。')
  }

  const handleDeletePost = async () => {
    if (!confirm('記事を削除しますか？')) return
    if (!token) return

    await fetch(`/api/admin/posts/${id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    })
    
    await mutate('/api/admin/posts')
    alert('記事を削除しました。')
    router.push('/admin/posts')
  }

  useEffect(() => {
    const fetcher = async () => {
      if (!token) return

      const res = await fetch(`/api/admin/posts/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      
      if (res.ok) {
        const { post }: { post: TPostsData } = await res.json()
        if (post) {
          setFormDefaults({ title: post.title, content: post.content })
          setThumbnailImageKey(post.thumbnailImageKey)
          setCategories(post.postCategories.map((pc) => pc.category))
        }
      }
    }

    if (!isLoding) {
      fetcher()
    }
  }, [id, token, isLoding])

  if (isLoding || !token) {
    return <p>読み込み中...</p>
  }

  return (
    <SWrapper>
      <SHead>
        <STitle>記事編集</STitle>
      </SHead>
      
      <PostForm
        key={formDefaults.title + formDefaults.content}   // 取得後にdefaultValues反映
        mode="edit"
        defaultValues={formDefaults}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        categories={categories}
        setCategories={setCategories}
        onSubmit={onSubmit}
        onDelete={handleDeletePost}
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
