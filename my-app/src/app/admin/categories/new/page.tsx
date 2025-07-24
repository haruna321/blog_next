"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CategoryForm } from '../_components/CategoryForm'
import styled from 'styled-components'

export default function Page() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトの動作をキャンセルします。
    e.preventDefault()

    // カテゴリーを作成します。
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    // レスポンスから作成したカテゴリーのIDを取得します。
    const { id } = await res.json()

    // 作成したカテゴリーの詳細ページに遷移します。
    router.push(`/admin/categories/${id}`)

    alert('カテゴリーを作成しました。')
  }

  return (
    <SWrapper>
     <SHead>
        <STitle>カテゴリー一覧</STitle>
        <SButton>カテゴリー作成</SButton>
      </SHead>

      <CategoryForm
        mode="new"
        name={name}
        setName={setName}
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
const SButton = styled.button`
  border-radius: 7px;
  background-color: #3184ff;
  color: #fff;
  font-size: 16px;
  width: 180px;
  text-align: center;
  padding: 10px;
  display: block;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  &:hover{
    transition: background 0.2s;
    background-color: #333;
  }
`
const STitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`