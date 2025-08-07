import { authenticateRequest } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string }},
) => {
  // 認証チェック
  const authError = await authenticateRequest(request)
  if (authError) return authError

  const { id } = params

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json({ status: 'OK', category}, { status: 200})
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400})
  }
}

interface CreateCategoryRequestBody {
  name: string
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string} },
) => {
  // 認証チェック
  const authError = await authenticateRequest(request)
  if (authError) return authError

  const { id } = params
  const { name }: CreateCategoryRequestBody = await request.json()

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name
      },
    })

    return NextResponse.json({ status: 'OK', category} , { status: 200})
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message}, { status: 400})
  }
}

export const DELETE = async (
  request: NextRequest,
  { params }: {params: { id: string } },
) => {
  // 認証チェック
  const authError = await authenticateRequest(request)
  if (authError) return authError

  const { id } = params

  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json({ status: 'OK'}, { status: 200})
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message}, { status: 400})
  }
}