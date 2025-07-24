import { TCategoryData } from "@/types"
import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Page() {
  const [categories, setCategories] = useState<TCategoryData[]>([])

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/categories')
      const { categories } = await res.json()
      setCategories(categories)
    }
    fetcher()
  }, [])

  return (
    <SWrapper>
      <SHead>
        <STitle>カテゴリ一覧</STitle>
        <SButton href="/admin/categories/new">新規作成</SButton>
      </SHead>

      <SCategoryList>
        {categories.map((category) => {
          return (
            <SLink href={`/admin/categories/${category.id}`} key={category.id}>
              <SCategory>{category.name}</SCategory>
            </SLink>
          )
        })}
      </SCategoryList>
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
const SButton = styled(Link)`
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

const SCategoryList = styled.div`
  margin-top: 50px;
`

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  text-decoration: none;
`
const SCategory = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`