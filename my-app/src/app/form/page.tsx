"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styled from 'styled-components';

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  // 各項目のエラーメッセージ
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [commentErrorMessage, setCommentErrorMessage] = useState("");

  // 送信処理
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // エラーメッセージの初期化
    setNameErrorMessage("");
    setEmailErrorMessage("");
    setCommentErrorMessage("");


    // エラーのチェック
    const emptyName = name === "";
    const excessiveNameLength = name.length > 30;
    const emptyEmail = email === "";
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const emptyComment = comment === "";
    const insufficientCommnetLength = comment.length > 500;

    const enableSubmit =
    !excessiveNameLength &&
    !emptyName &&
    !emptyEmail &&
    validEmail &&
    !emptyComment &&
    !insufficientCommnetLength;

    if (emptyName) {
      setNameErrorMessage("名前を入力してください");
    } else if (excessiveNameLength) {
      setNameErrorMessage("名前は30文字以内で入力してください");
    }
    if (emptyEmail) {
      setEmailErrorMessage("メールアドレスを入力してください");
    } else if (!validEmail){
      setEmailErrorMessage("正しいメールアドレス形式で入力してください");
    }
    if (emptyComment) {
      setCommentErrorMessage("本文を入力してください");
    } else if (insufficientCommnetLength) {
      setCommentErrorMessage("本文は500文字以内で入力してください");
    }

    if (!enableSubmit) return;

    setIsSending(true);
    try {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: comment }),
      });
      if (!res.ok) throw new Error("送信失敗");

      alert("送信しました！");
      handleClear();
    } catch {
      alert("送信に失敗しました");
    } finally {
      setIsSending(false);
    }
  };

  // クリア
  const handleClear = () => {
    setName("");
    setEmail("");
    setComment("");
    setNameErrorMessage("");
    setEmailErrorMessage("");
    setCommentErrorMessage("");
  };

  // onChange
  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };
  const handleChangeComment = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  return (
    <SBody>
      <STitle>問い合わせフォーム</STitle>
      <SForm onSubmit={handleSubmit}>
        <SDl>
          <SDt><span>必須</span><label htmlFor="name">お名前</label></SDt>
          <SDd><input id="name" name="name" type="text" onChange={handleChangeName} value={name} disabled={isSending} />
          {nameErrorMessage && (
            <SErrorMessage>
              {nameErrorMessage}
            </SErrorMessage>
          )}
          </SDd>
        </SDl>
        <SDl>
          <SDt><span>必須</span><label htmlFor="email">メールアドレス</label></SDt>
          <SDd><input id="email" name="email" type="email" onChange={handleChangeEmail} value={email} disabled={isSending} />
          {emailErrorMessage && (
            <SErrorMessage>
              {emailErrorMessage}
            </SErrorMessage>
          )}
          </SDd>
        </SDl>
        <SDl>
          <SDt><span>必須</span><label htmlFor="message">本文</label></SDt>
          <SDd><textarea id="message" name="message" onChange={handleChangeComment} value={comment} disabled={isSending} />
          {commentErrorMessage && (
            <SErrorMessage>
              {commentErrorMessage}
            </SErrorMessage>
          )}
          </SDd>
        </SDl>
        <SButtonWrapper>
          <SButton type="submit" disabled={isSending}>送信</SButton>
          <SButton type="button" onClick={handleClear}>クリア</SButton>
        </SButtonWrapper>
      </SForm>
    </SBody>
  )
}

export default Form;

const SBody = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 50px auto;
`
const STitle = styled.p``
const SForm = styled.form`
  margin-top: 50px;
`
const SDl = styled.dl`
  display: flex;
  align-items: flex-start;
`
const SDt = styled.dt`
  font-size: 16px;
  width: 20%;
  span{
    font-size: 12px;
    color: #fff;
    background-color: red;
    border-radius: 3px;
    padding: 5px 10px;
    margin-right: 10px;
  }
`
const SDd = styled.dd`
  width: 80%;
  input,textarea{
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #dcdcdc;
  }
  textarea{
    height: 100px;
  }
`
const SErrorMessage = styled.p`
  color: red;
`
const SButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
`
const SButton = styled.button``

