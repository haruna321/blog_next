"use client";

import { supabase } from "@/utils/supabase";
import { useState } from "react";
import styled from "styled-components";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/user/login`,
        },
      });
      if (error) {
        alert("登録に失敗しました");
        return;
      }
      setEmail("");
      setPassword("");
      alert("確認メールを送信しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SWrapper>
      <SCard>
        <STitle>新規登録</STitle>
        <form onSubmit={handleSubmit}>
          <SEdit>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </SEdit>
          <SEdit>
            <label htmlFor="password">パスワード</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </SEdit>
          <SSubmit type="submit" disabled={isSubmitting}>登録</SSubmit>
        </form>
      </SCard>
    </SWrapper>
  );
}

const SWrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;
const SCard = styled.section`
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: #fff;
`;
const STitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;
const SEdit = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 12px;
`;
const SSubmit = styled.button`
  width: 100%;
  padding: 10px 16px;
  border-radius: 6px;
  background: #1663df;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;