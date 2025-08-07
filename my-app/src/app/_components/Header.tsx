"use client";

import Link from 'next/link'
import React from 'react'
import { useSupabaseSession } from '../_hooks/useSupabaseSession'
import { supabase } from '@/utils/supabase'
import styled from '@emotion/styled';

export const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const { session, isLoding } = useSupabaseSession()

  return (
    <SHeader>
      <SLink href="/">Blog</SLink>
      {!isLoding && (
        <div>
          {session ? (
            <SButtonWrap>
              <SLink href="/admin">管理画面</SLink>
              <SButton onClick={handleLogout}>ログアウト</SButton>
            </SButtonWrap>
          ) : (
            <SButtonWrap>
              <SLink href="/contact">お問い合わせ</SLink>
              <SLink href="/login">ログイン</SLink>
            </SButtonWrap>
          )}
        </div>
      )}
    </SHeader>
  )
}

const SHeader = styled.header`
  background-color: #001558;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`

const SButtonWrap = styled.div`
  display: flex;
  gap: 10px;
`

const SLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
`

const SButton = styled.button``