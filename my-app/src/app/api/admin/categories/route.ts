import { authenticateRequest } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient()

// GET
export const GET = async (request: NextRequest) => {
  // 認証チェック
  const authError = await authenticateRequest(request)
  if (authError) return authError

  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ status: 'OK', categories: categories}, { status: 200})
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 })
  }
}

// カテゴリー作成のリクエストボディの型
interface CreateCategoryRequestBody{
  name: string
}

//POST
export const POST = async (request: NextRequest) => {
// 認証チェック
  const authError = await authenticateRequest(request)
  if (authError) return authError

  try {
    const body = await request.json()

    const { name }:CreateCategoryRequestBody = body

    const data = await prisma.category.create({
      data: {
        name,
      },
    })

    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message}, {status: 400})
    }
  }
}