
import React, { ChangeEvent, useEffect, useState } from 'react'
import { CategoriesSelect } from './CategoriesSelect'
import { TCategoryData } from '@/types'
import styled from 'styled-components'
import { supabase } from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

type PostFormValues = { title: string; content: string }
interface Props {
  mode: 'new' | 'edit'
  defaultValues: PostFormValues
  thumbnailImageKey: string
  setThumbnailImageKey: (thumbnailImageKey: string) => void
  categories: TCategoryData[]
  setCategories: (categories: TCategoryData[]) => void
  onSubmit: (data: PostFormValues) => void
  onDelete?: () => void
}

export const PostForm: React.FC<Props> = ({
  mode,
  defaultValues,
  thumbnailImageKey,
  setThumbnailImageKey,
  categories,
  setCategories,
  onSubmit,
  onDelete,
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
  useForm<PostFormValues>({ defaultValues })

const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(null)


const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
  if (!event.target.files || event.target.files.length == 0){

      // 画像が選択されていないのでreturn
      return
    }

    // eventから画像を取得
    const file = event.target.files[0] // 選択された画像を取得

    // private/は必ずつけること
    const filePath = `private/${uuidv4()}` // ファイル名を指定

    // Supabase Storageに画像をアップロード
    const { data, error } = await supabase.storage
      .from('post-thumbnail')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    // アップロードに失敗したらエラーを表示
    if (error) {
      alert(error.message)
      return
    }

    // data.pathに画像のパスが格納されているので、thumbnailImageKeyに格納
    setThumbnailImageKey(data.path)
  }

  // DBに保存しているthumbnailImageKeyを元に、Supabaseから画像のURLを取得する
  useEffect(() => {
    if (!thumbnailImageKey) return

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from('post-thumbnail')
        .getPublicUrl(thumbnailImageKey)

      setThumbnailImageUrl(publicUrl)
    }

    fetcher()
  }, [thumbnailImageKey])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SEdit>
        <label htmlFor="title">タイトル</label>
        <input 
          id="title" 
          {...register('title', { required: '必須です' })}
          disabled={isSubmitting}
        />
      </SEdit>
      {errors.title && <SError>{errors.title.message}</SError>}

      <SEdit>
        <label htmlFor="content">内容</label>
        <textarea 
          id="content" 
          {...register('content', { required: '必須です' })}
          disabled={isSubmitting}
        />
      </SEdit>
      {errors.content && <SError>{errors.content.message}</SError>}

      <SEdit>
        <label htmlFor="thumbnailImageKey">サムネイルURL</label>
        <input type="file" id="thumbnailImageKey" onChange={handleImageChange} accept="image/*" />
        {thumbnailImageUrl && (
          <SImage src={thumbnailImageUrl} alt="thumbnail" width={400} height={400} />
        )}
      </SEdit>
      <SEdit>
        <label>カテゴリー</label>
        <CategoriesSelect
          selectedCategories={categories}
          setSelectedCategories={setCategories}
        />
      </SEdit>
      <SButton type="submit" disabled={isSubmitting}>
        {mode === 'new' ? '作成' : '更新'}
      </SButton>
      {mode === 'edit' && (
        <SDeleteButton 
        type="button" 
        onClick={onDelete} 
        disabled={isSubmitting}
        >
          削除
        </SDeleteButton>
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

const SImage = styled(Image)`
  object-fit: contain;
`
const SError = styled.p`
  color: #d32f2f;
`