"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CategoryForm } from '../_components/CategoryForm'
import styled from 'styled-components'
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'
import { mutate } from 'swr'

export default function Page() {
  const [name, setName] = useState('')
  const { id } = useParams()
  const router = useRouter()
  const { token, isLoding } = useSupabaseSession()

  const onSubmit = async ({ name }: { name: string }) => {

    if (!token) return

    await fetch(`/api/admin/categories/${id}`,
      {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ name }),
    })

    await mutate('/api/admin/categories')
    alert('カテゴリーを更新しました。')
  }

  const handleDeletePost = async () => {
    if (!confirm('カテゴリーを削除しますか？')) return
    if (!token) return
    await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    })
    await mutate('/api/admin/categories')
    alert('カテゴリーを削除しました。')
    router.push('/admin/categories')
  }

  useEffect(() => {
    const fetcher = async () => {
      if (!token) return

      const res = await fetch(`/api/admin/categories/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      
      if (res.ok) {
        const { category } = await res.json()
        if (category) {
          setName(category.name)
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
        <STitle>カテゴリ編集</STitle>
      </SHead>

      <CategoryForm
        key={name}                  
        mode="edit"
        defaultValues={{ name }}
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
