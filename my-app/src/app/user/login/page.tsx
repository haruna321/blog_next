"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/user/profile` },
    });
    if (error) alert(error.message);
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("ログインに失敗しました");
        return;
      }
      const token = data.session?.access_token;
      if (token) {
        document.cookie = `sb-access-token=${token}; Max-Age=604800; Path=/; SameSite=Lax`;
      }
      router.replace("/user/profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SWrapper>
      <SCard>
        <STitle>ログイン</STitle>
        <SButton type="button" onClick={handleGoogleLogin}>
          Googleでログイン
        </SButton>
        <SSeparator>または</SSeparator>
        <form onSubmit={handleEmailLogin}>
          <SEdit>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </SEdit>
          <SEdit>
            <label htmlFor="password">パスワード</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </SEdit>
          <SSubmit type="submit" disabled={isSubmitting}>ログイン</SSubmit>
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
const SButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  border-radius: 6px;
  background: #4285f4;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;
const SSeparator = styled.p`
  margin: 16px 0;
  text-align: center;
  color: #666;
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