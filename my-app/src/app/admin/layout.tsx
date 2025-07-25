"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const isSelected = (href: string) => {
    return pathname.includes(href)
  }
  return (
    <SWrapper>
      <SAside>
        <SLink href="/admin/posts" $selected={isSelected('/admin/posts')}>記事一覧</SLink>
        <SLink href="/admin/categories" $selected={isSelected('/admin/categories')}>カテゴリー一覧</SLink>
      </SAside>
      <SMain>
        {children}
      </SMain>
    </SWrapper>
  )
}

const SWrapper = styled.div`
  display: flex;
`
const SAside = styled.aside`
  width: 300px;
  height: 100vh;
  background-color: #333;
`

const SLink = styled(Link)<{ $selected: boolean }>`
  color: ${({ $selected }) => ($selected ? '#333' : '#fff')};
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
  background: ${({ $selected }) => ($selected ? '#eaf2ff' : 'transparent')};
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  display: block;
  border-bottom: 1px solid #eaf2ff;
  &:hover {
    color: #333;
    background: #eaf2ff;
    transition: background 0.2s, color 0.2s;
  }
`

const SMain = styled.div`
  width: calc(100% - 300px);
`