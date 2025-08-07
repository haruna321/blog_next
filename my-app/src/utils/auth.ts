import { supabase } from './supabase'
import { NextRequest, NextResponse } from 'next/server'

export const authenticateRequest = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? ''

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token)

  // 送ったtokenが正しくない場合、errorが返却されるので、クライアントにもエラーを返す
  if (error) {
    return NextResponse.json({ status: error.message }, { status: 400 })
  }

  // 認証成功の場合はnullを返す
  return null
}