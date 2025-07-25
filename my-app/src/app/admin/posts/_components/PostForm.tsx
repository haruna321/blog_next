
import React from 'react'
import { CategoriesSelect } from './CategoriesSelect'
import { TCategoryData } from '@/types'
import styled from 'styled-components'

interface Props {
  mode: 'new' | 'edit'
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
  thumbnailUrl: string
  setThumbnailUrl: (thumbnailUrl: string) => void
  categories: TCategoryData[]
  setCategories: (categories: TCategoryData[]) => void
  onSubmit: (e: React.FormEvent) => void
  onDelete?: () => void
}

export const PostForm: React.FC<Props> = ({
  mode,
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  setCategories,
  onSubmit,
  onDelete,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <SEdit>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </SEdit>
      <SEdit>
        <label htmlFor="content">内容</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </SEdit>
      <SEdit>
        <label htmlFor="thumbnailUrl">サムネイルURL</label>
        <input
          type="text"
          id="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
      </SEdit>
      <SEdit>
        <label htmlFor="thumbnailUrl">カテゴリー</label>
        <CategoriesSelect
          selectedCategories={categories}
          setSelectedCategories={setCategories}
        />
      </SEdit>
      <SButton type="submit">
        {mode === 'new' ? '作成' : '更新'}
      </SButton>
      {mode === 'edit' && (
        <SDeleteButton type="button" onClick={onDelete}>削除</SDeleteButton>
      )}
    </form>
  )
}

const SEdit = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
  label{
    width: 200px;
  }
`
const SButton = styled.button`
  background: #1663df;
  color: #fff;
  font-weight: bold;
  padding: 0.7em 2em;
  border: none;
  border-radius: 4px;
  margin-right: 1em;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #114ca8;
  }
`

const SDeleteButton = styled.button`
  background: #fff;
  color: #d32f2f;
  font-weight: bold;
  padding: 0.7em 2em;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #d32f2f;
    color: #fff;
  }
`