"use client";

import { supabase } from '@/utils/supabase' 
import { useState } from 'react'
import styled from 'styled-components'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    })
    if (error) {
      alert('登録に失敗しました')
    } else {
      setEmail('')
      setPassword('')
      alert('確認メールを送信しました。')
    }
  }

  return (
    <SWrapper>
      <form onSubmit={handleSubmit}>
        <SEdit>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@company.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </SEdit>
        <SEdit>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </SEdit>
        <SButton type="submit">登録</SButton>
      </form>
    </SWrapper>
  )
}

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const SEdit = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`

const SButton = styled.button`
  border: 1px solid rgb(22, 99, 223);
  color: rgb(22, 99, 223);
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  margin-top: 1rem;
  display: block;
  margin-inline: auto;
`