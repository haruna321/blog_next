import React from 'react'
import styled from 'styled-components'

interface Props {
  mode: 'new' | 'edit'
  name: string
  setName: (title: string) => void
  onSubmit: (e: React.FormEvent) => void
  onDelete?: () => void
}

export const CategoryForm: React.FC<Props> = ({
  mode,
  name,
  setName,
  onSubmit,
  onDelete,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <SEdit>
        <label htmlFor="title">カテゴリー名</label>
        <input
          type="text"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
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